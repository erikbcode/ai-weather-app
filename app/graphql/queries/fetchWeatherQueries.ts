import { gql } from '@apollo/client';

const fetchWeatherQuery = gql`
  query MyQuery(
    $current_weather: String
    $daily: String = "weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max"
    $hourly: String = "temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,windgusts_10m,uv_index,uv_index_clear_sky"
    $longitude: String!
    $latitude: String!
    $timezone: String!
    $precipitation_unit: String
    $temperature_unit: String
    $windspeed_unit: String
  ) {
    myQuery(
      current_weather: $current_weather
      daily: $daily
      hourly: $hourly
      longitude: $longitude
      latitude: $latitude
      timezone: $timezone
      precipitation_unit: $precipitation_unit
      temperature_unit: $temperature_unit
      windspeed_unit: $windspeed_unit
    ) {
      latitude
      longitude
      timezone
      timezone_abbreviation
      utc_offset_seconds
      elevation
      generationtime_ms
      current_weather {
        is_day
        temperature
        time
        weathercode
        winddirection
        windspeed
      }
      daily {
        apparent_temperature_max
        apparent_temperature_min
        sunrise
        sunset
        temperature_2m_max
        temperature_2m_min
        time
        uv_index_clear_sky_max
        uv_index_max
        weathercode
      }
      daily_units {
        apparent_temperature_max
        apparent_temperature_min
        sunrise
        sunset
        temperature_2m_max
        temperature_2m_min
        time
        uv_index_clear_sky_max
        uv_index_max
        weathercode
      }
      hourly {
        precipitation
        precipitation_probability
        rain
        relativehumidity_2m
        showers
        snow_depth
        snowfall
        temperature_2m
        time
        uv_index
        uv_index_clear_sky
        windgusts_10m
      }
      hourly_units {
        precipitation
        precipitation_probability
        rain
        relativehumidity_2m
        showers
        snow_depth
        snowfall
        temperature_2m
        time
        uv_index
        uv_index_clear_sky
        windgusts_10m
      }
    }
  }
`;

export default fetchWeatherQuery;
