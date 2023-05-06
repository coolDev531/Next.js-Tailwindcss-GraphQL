import { getClient } from '@/apollo-client';
import React from 'react';
import fetchWeatherQuery from '@/graphql/queries/fetchWeatherQuery';
import { Root } from '@/types/weather';
import CalloutCard from '@/components/CalloutCard';
import StatCard from '@/components/StatCard';
import celsiusToFahrenheit from '@/lib/convertCelciusToFarenheit';
import kmhToMph from '@/lib/kmhToMph';

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

  const farenheitMax = celsiusToFahrenheit(
    results.daily.temperature_2m_max[0]
  ).toFixed(1);
  const farenheitMin = celsiusToFahrenheit(
    results.daily.temperature_2m_min[0]
  ).toFixed(1);

  const windspeedMPH = kmhToMph(results.current_weather.windspeed).toFixed(1);

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      {/* <InformationPanel/> */}

      <div className="flex-1 p-5 lg:p-10">
        <div className="p-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold">Todays Overview</h2>
            <p className="text-sm text-gray-400">
              Last Updated At:{' '}
              {new Date(results.current_weather.time).toLocaleString()} (
              {results.timezone})
            </p>
          </div>

          <div className="m-2 mb-10">
            <CalloutCard message={'This is where GPT4 Summary Will Go'} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
            <StatCard
              title="Maximum Temperature"
              metric={`${farenheitMax}°F`}
              color="yellow"
            />

            <StatCard
              title="Minimum Temperature"
              metric={`${farenheitMin}°F`}
              color="yellow"
            />

            <div id="weather__uv-index">
              <StatCard
                title="UV Index"
                metric={`${results.daily.uv_index_max[0].toFixed(1)}`}
                color="rose"
              />
              {Number(results.daily.uv_index_max[0].toFixed(1)) > 5 && (
                <CalloutCard
                  message="UV Index is high, wear sunscreen!"
                  warning
                />
              )}
            </div>

            <div id="weather__wind" className="flex space-x-3">
              <StatCard
                title="Wind Speed"
                metric={`${windspeedMPH}mph`}
                color="cyan"
              />
              <StatCard
                title="Wind Direction"
                metric={`${results.current_weather.winddirection.toFixed(1)}°`}
                color="cyan"
              />
            </div>
          </div>
        </div>

        <hr className="mb-5" />

        <div className="space-y-3">
          {/* TemperatureChart */}
          {/* RainChart */}
          {/* HumidityChart */}
        </div>
      </div>
    </div>
  );
}

export default WeatherPage;
