import { getClient } from '@/apollo-client';
import React from 'react';
import fetchWeatherQuery from '@/graphql/queries/fetchWeatherQuery';
import { Root } from '@/types/weather';
import CalloutCard from '@/components/CalloutCard';

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

  return (
    <div>
      {/* <InformationPanel/> */}

      <div>
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
            <CalloutCard
            
              message={'This is where GPT4 Summary Will Go'} />
          </div>

          <d
        </div>
      </div>
    </div>
  );
}

export default WeatherPage;
