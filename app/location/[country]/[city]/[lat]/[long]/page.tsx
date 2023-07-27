import React, { useState } from 'react';
import axios from 'axios';
import { getClient } from '@/apollo-client';
import CalloutCard from '@/components/CalloutCard';
import StatCard from '@/components/StatCard';
import InformationPanel from '@/components/InformationPanel';
import TempChart from '@/components/TempChart';
import RainChart from '@/components/RainChart';
import HumidityChart from '@/components/HumidityChart';
import { cleanData } from '@/lib/cleanData';
import { getBasePath } from '@/lib/getBasePath';
import { getTimezoneFromCoordinates } from '@/lib/getTimezoneFromCoordinates';
import fetchWeatherQuery from '@/app/graphql/queries/fetchWeatherQueries';

export const revalidate = 60 * 24;

type Props = {
  params: {
    country: string;
    city: string;
    lat: string;
    long: string;
  };
};

async function WeatherPage({ params: { country, city, lat, long } }: Props) {
  const weatherClient = getClient();

  const timeZone = await getTimezoneFromCoordinates(
    lat,
    long,
    process.env.GOOGLE_MAPS_API_KEY
  );

  const degreeString = country === 'UnitedStates' ? '°F' : '°C';
  const speedString = country === 'UnitedStates' ? 'mph' : 'km/h';

  const { data, error, loading } = await weatherClient.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: 'true',
      longitude: long,
      latitude: lat,
      timezone: timeZone || 'GMT',
      precipitation_unit: country === 'UnitedStates' ? 'inch' : 'mm',
      windspeed_unit: country === 'UnitedStates' ? 'mph' : 'kmh',
      temperature_unit: country === 'UnitedStates' ? 'fahrenheit' : 'celsius',
    },
  });

  if (error) {
    return (
      <div>
        <p>error</p>
      </div>
    );
  }

  const results: Root = data.myQuery;

  const dataToSend = cleanData(results, city);

  const GPTresult = await fetch(`${getBasePath()}/api/getWeatherSummary`, {
    method: 'POST',
    body: JSON.stringify({ weatherData: dataToSend }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const GPTdata = await GPTresult.json();
  const { content } = GPTdata;

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <InformationPanel
        city={city}
        latitude={lat}
        longitude={long}
        results={results}
        timeZone={results.timezone}
        country={country}
      />
      <div className="flex-1 p-5 lg:p-10">
        <div className="p-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold">Today's Overview</h2>
            <p className="test-sm text-gray-400">
              Last Updated at:{' '}
              {new Date(results.current_weather.time).toLocaleString()}
            </p>
          </div>
          <div className="m-2 mb-10">
            <CalloutCard message={content} />
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
            <StatCard
              title="Maximum Temperature"
              metric={`${results.daily.temperature_2m_max[0].toFixed(
                1
              )}${degreeString}`}
              color="yellow"
            />
            <StatCard
              title="Minimum Temperature"
              metric={`${results.daily.temperature_2m_min[0].toFixed(
                1
              )}${degreeString}`}
              color="green"
            />
            <div>
              <StatCard
                title="UV Index"
                metric={results.daily.uv_index_max[0].toFixed(1)}
                color="rose"
              />
              {Number(results.daily.uv_index_max[0].toFixed(1)) > 5 && (
                <CalloutCard
                  warning
                  message="The UV is high today, be sure to wear SPF!"
                />
              )}
            </div>
            <div className="flex space-x-3">
              <StatCard
                title="Wind Speed"
                metric={`${results.current_weather.windspeed.toFixed(
                  1
                )}${speedString}`}
                color="cyan"
              />
              <StatCard
                title="Wind Direction"
                metric={`${results.current_weather.winddirection.toFixed(1)}°`}
                color="purple"
              />
            </div>
          </div>
        </div>

        <hr className="mb-5" />

        <div className="space-y-3">
          <TempChart results={results} />
          <RainChart results={results} />
          <HumidityChart results={results} />
        </div>
      </div>
    </div>
  );
}

export default WeatherPage;
