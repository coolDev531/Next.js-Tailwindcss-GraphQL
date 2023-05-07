import { Root } from '@/types/weather';
import celsiusToFahrenheit from './convertCelciusToFarenheit';
import kmhToMph from './kmhToMph';

const cleanWeatherData = (data: Root, city: string) => {
  const {
    current_weather,
    timezone,
    hourly,
    hourly_units,
    timezone_abbreviation,
  } = data;

  const { temperature, windspeed, winddirection, weathercode, time } =
    current_weather;

  const {
    temperature_2m,
    snowfall,
    rain,
    relativehumidity_2m,
    precipitation_probability,
    uv_index,
  } = hourly;

  return {
    current_weather: {
      temperature: celsiusToFahrenheit(temperature),
      windspeed: kmhToMph(windspeed),
      winddirection,
      time,
      weathercode,
    },
    hourly: {
      // slicing only the first 24 hours worth of data so chatgpt doesn't charge me for too much data (tokens)
      temperature_2m: temperature_2m
        .map((temperature) => celsiusToFahrenheit(temperature))
        .slice(0, 24),
      snowfall: snowfall.slice(0, 24),
      rain: rain.slice(0, 24),
      relativehumidity_2m: relativehumidity_2m.slice(0, 24),
      precipitation_probability: precipitation_probability.slice(0, 24),
      uv_index: uv_index.slice(0, 24),
    },
    timezone,
    timezone_abbreviation,
    hourly_units,
    city,
  };
};

export default cleanWeatherData;
