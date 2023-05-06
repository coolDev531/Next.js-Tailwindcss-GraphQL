'use client';

import { Root } from '@/types/weather';
import { Card, AreaChart, Title } from '@tremor/react';

type Props = {
  results: Root;
};

function HumidityChart({ results }: Props) {
  const hourly = results?.hourly.time
    .map((time) =>
      new Date(time).toLocaleString('en-US', {
        hour: 'numeric',
        hour12: false,
      })
    )
    .slice(0, 24);

  const data = hourly.map((hour, idx) => ({
    time: Number(hour),
    'Humidity (%)': results.hourly.relativehumidity_2m[idx],
  }));

  const dataFormatter = (number: number) => `${number} %`;

  return (
    <Card>
      <Title className="text-white">Humidity Levels</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        categories={['Humidity (%)']}
        colors={['teal']}
        minValue={0}
        maxValue={100}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
}

export default HumidityChart;
