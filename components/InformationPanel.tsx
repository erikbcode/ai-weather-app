import React from 'react';
import Image from 'next/image';
import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import CityPicker from './CityPicker';
import { weatherCodeToString } from '@/lib/weatherCodeToString';

type Props = {
  city: string;
  results: Root;
  latitude: string;
  longitude: string;
  timeZone: string;
  country: string;
};

function InformationPanel({
  city,
  latitude,
  longitude,
  results,
  timeZone,
  country,
}: Props) {
  return (
    <div className="bg-gradient-to-br from-[#394f6B] to-[#183B7E] text-white p-10">
      <div className="pb-5">
        <h1 className="text-6xl font-bold">{decodeURI(city)}</h1>
        <p className="text-xs text-gray-400">
          Long/Lat: {longitude}, {latitude}
        </p>
        <p className="text-xs text-gray-400">TimeZone: {timeZone}</p>
      </div>

      <CityPicker />

      <hr className="my-10" />

      <div className="mt-5 flex items-center justify-between space-x-10 mb-5">
        <div>
          <p className="text-xl">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <p className="text-xl font-bold uppercase">
          {new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
        </p>
      </div>

      <hr className="mt-10 mb-5" />

      <div className="flex items-center justify-between">
        <div>
          <Image
            src={`https://cdn.weatherbit.io/static/img/icons/${
              weatherCodeToString[results.current_weather.weathercode].icon
            }.png`}
            alt={weatherCodeToString[results.current_weather.weathercode].label}
            width={75}
            height={75}
          />
          <div className="flex items-center justify-between space-x-10">
            <p className="text-5xl font-semibold">
              {results.current_weather.temperature.toFixed(1)}
              {country === 'UnitedStates' ? '°F' : '°C'}
            </p>

            <p className="text-right font-extralight text-lg">
              {weatherCodeToString[results.current_weather.weathercode].label}
            </p>
          </div>
        </div>
      </div>
      <div className="py-5 space-y-2">
        <div className="flex items-center justify-between rounded-md border-2 border-[#6F90CD] bg-[#405885] space-x-2 py-3 px-4">
          <SunIcon className="h-10 w-10 text-gray-400" />
          <div className="flex flex-1 items-center justify-between">
            <p className="font-extralight">Sunrise</p>
            <p className="text-2xl">
              {new Date(results.daily.sunrise[0]).toLocaleTimeString('en-US', {
                hour12: true,
                hour: 'numeric',
                minute: 'numeric',
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-md border-2 border-[#6F90CD] bg-[#405885] space-x-2 py-3 px-4">
          <MoonIcon className="h-10 w-10 text-gray-400" />
          <div className="flex flex-1 items-center justify-between">
            <p className="font-extralight">Sunset</p>
            <p className="text-2xl">
              {new Date(results.daily.sunset[0]).toLocaleTimeString('en-US', {
                hour12: true,
                hour: 'numeric',
                minute: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformationPanel;
