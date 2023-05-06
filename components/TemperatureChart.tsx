'use client';

import { Card, AreaChart, Title } from '@tremor/react';
import celsiusToFahrenheit from '@/lib/convertCelciusToFarenheit';
import { Root } from '@/types/weather';

type Props = {
  results: Root;
};

function TemperatureChart({ results }: Props) {
  const hourly = results?.hourly.time
    .map((time: string) =>
      new Date(time).toLocaleString('en-US', {
        hour: 'numeric',
        hour12: false,
      })
    )
    .slice(0, 24);

  const data = hourly?.map((hour: string, idx: number) => ({
    time: Number(hour),
    'UV Index': results?.hourly.uv_index[idx],
    'Temperature (F)': celsiusToFahrenheit(
      results.hourly.temperature_2m[idx]
    ).toFixed(2),
  }));

  const dataFormatter = (number: number) => `${number}`;

  return (
    <Card>
      <Title className="text-white">Temperature & UV Index</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        categories={['Temperature (F)', 'UV Index']}
        colors={['yellow', 'rose']}
        minValue={0}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
}

export default TemperatureChart;
