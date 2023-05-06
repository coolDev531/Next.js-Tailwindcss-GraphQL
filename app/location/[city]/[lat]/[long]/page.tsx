import React from 'react';
import { getClient } from '@/apollo-client';

// lib
import fetchWeatherQuery from '@/graphql/queries/fetchWeatherQuery';
import celsiusToFahrenheit from '@/lib/convertCelciusToFarenheit';
import kmhToMph from '@/lib/kmhToMph';
import cleanWeatherData from '@/lib/cleanWeatherData';
import getBasePath from '@/lib/getBasePath';
import { Root } from '@/types/weather';

// components
import CalloutCard from '@/components/CalloutCard';
import StatCard from '@/components/StatCard';
import InformationPanel from '@/components/InformationPanel';
import TemperatureChart from '@/components/TemperatureChart';
import WindSpeedCard from '@/components/WindSpeedCard';
import RainChart from '@/components/RainChart';
import HumidityChart from '@/components/HumidityChart';

export const revalidate = 60; // comes with next.js, every 60 seconds it will retrigger a rebuild of the cache (provided that the page is visited)

type Props = {
  params: {
    city: string;
    lat: string;
    long: string;
  };
};

// can do async in server component
async function WeatherPage({ params: { city, lat, long } }: Props) {
  const client = getClient();

  const { data } = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: 'true',
      longitude: long,
      latitude: lat,
      // timezone: 'America/New_York',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  });

  const results: Root = data.myQuery;

  const dataToSendGPT = cleanWeatherData(results, city);

  const res = await fetch(`${getBasePath()}/api/getWeatherSummary`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      weatherData: dataToSendGPT,
    }),
  });

  const GPTdata = await res.json();

  const farenheitMax = celsiusToFahrenheit(
    results.daily.temperature_2m_max[0]
  ).toFixed(1);
  const farenheitMin = celsiusToFahrenheit(
    results.daily.temperature_2m_min[0]
  ).toFixed(1);

  const windspeedMPH = kmhToMph(results.current_weather.windspeed).toFixed(1);

  return (
    <div className="flex flex-col min-h-screen lg:flex-row">
      <InformationPanel city={city} long={long} lat={lat} results={results} />

      <div className="flex-1 p-5 lg:p-10">
        <div className="p-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold">Todays Overview</h2>
            <p className="text-sm text-gray-400">
              Last Updated at:{' '}
              {new Date(results.current_weather.time).toLocaleString()} (
              {results.timezone})
            </p>
          </div>

          <div className="m-2 mb-10">
            <CalloutCard message={GPTdata.content} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
            <StatCard
              title="Maximum Temperature"
              metric={`${farenheitMax}°`}
              color="yellow"
            />

            <StatCard
              title="Minimum Temperature"
              metric={`${farenheitMin}°`}
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
                  message={'The UV is high today, be sure to wear SPF!'}
                  warning
                />
              )}
            </div>

            <div className="flex space-x-3">
              <StatCard
                title="Wind Speed"
                metric={`${windspeedMPH}mph`}
                color="cyan"
              />

              <WindSpeedCard
                title="Wind Direction"
                metric={`${results.current_weather.winddirection.toFixed(1)}°`}
                color="violet"
                degrees={results.current_weather.winddirection}
              />
            </div>
          </div>
        </div>

        <hr className="mb-5" />

        <div className="space-y-3">
          <TemperatureChart results={results} />
          <RainChart results={results} />
          <HumidityChart results={results} />
        </div>
      </div>
    </div>
  );
}

export default WeatherPage;
