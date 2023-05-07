'use client';

import { useEffect, useState } from 'react';
import cleanWeatherData from '@/lib/cleanWeatherData';
import getBasePath from '@/lib/getBasePath';
import { Root } from '@/types/weather';
import CalloutCard from './CalloutCard';
import useInterval from '@/hooks/useInterval.hook';
import {
  loadVoicesWhenAvailable,
  speak,
  cancel,
  isSpeaking,
} from '@/lib/speech';
import { Button } from '@tremor/react';
import { SpeakerphoneIcon, StopIcon } from '@heroicons/react/solid';

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

  useEffect(() => {
    // speak({
    //   text: GPTdata,
    // });

    if (typeof window !== 'undefined') {
      loadVoicesWhenAvailable(() => {
        console.log('voices loaded');
      });
    }
  }, [GPTdata]);

  return (
    <div className="relative">
      <CalloutCard message={isLoading ? loadingMsg : GPTdata} />

      <SpeakerphoneIcon
      fontSize={10}
        className="block absolute bottom-0 right-0 text-white"
        onClick={() => {
          if (!isSpeaking()) {
            return speak({ text: GPTdata });
          }

          cancel();
        }}
      />
    </div>
  );
}

export default WeatherSummary;
