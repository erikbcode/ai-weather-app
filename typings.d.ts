interface CurrentWeather {
  is_day: number;
  temperature: number;
  time: string;
  weathercode: number;
  winddirection: number;
  windspeed: number;
}

interface Daily {
  sunrise: [string];
  sunset: [string];
  temperature_2m_max: [number];
  temperature_2m_min: [number];
  time: [string];
  uv_index_max: [number];
  weathercode: [number];
}

interface DailyUnits {
  sunrise: string;
  sunset: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  time: string;
  uv_index_max: string;
  weathercode: string;
}

interface Hourly {
  precipitation: [number];
  relativehumidity_2m: [number];
  temperature_2m: [number];
  time: [string];
  uv_index: [number];
}

interface HourlyUnits {
  precipitation: string;
  relativehumidity_2m: string;
  temperature_2m: string;
  time: string;
}

interface Root {
  current_weather: CurrentWeather;
  daily: Daily;
  daily_units: DailyUnits;
  elevation: number;
  generationtime_ms: number;
  hourly: Hourly;
  hourly_units: HourlyUnits;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}
