'use client';

import { useEffect, useState } from 'react';
import cleanWeatherData from '@/lib/cleanWeatherData';
import getBasePath from '@/lib/getBasePath';
import { Root } from '@/types/weather';
import CalloutCard from './CalloutCard';
import useInterval from '@/hooks/useInterval.hook';

type Props = {
  city: string;
  results: Root;
};

function WeatherSummary({ results, city }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [dots, setDots] = useState('');

  const [GPTdata, setGPTdata] = useState('' as string);

  useEffect(() => {
    const handleFetch = async () => {
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
      setGPTdata(GPTdata.content);
      setIsLoading(false);
    };

    handleFetch();
  }, [city, results]);

  useInterval(
    () => {
      setDots((dots) => (dots === '...' ? '' : dots + '.'));
    },
    1000,
    !isLoading
  );

  const loadingMsg = `Loading AI Weather Summary${dots}`;

  return <CalloutCard message={isLoading ? loadingMsg : GPTdata} />;
}

export default WeatherSummary;
