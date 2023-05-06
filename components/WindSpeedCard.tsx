'use client';

import { Card, Color, Metric, Text } from '@tremor/react';
import Compass from './Compass';

type Props = {
  title: string;
  metric: string;
  color?: Color;
  degrees: number;
};

function WindSpeedCard({ title, metric, color, degrees }: Props) {
  return (
    <Card
      decoration="top"
      decorationColor={color}
      style={{
        minHeight: '200px',
      }}>
      <Text>{title}</Text>
      {/* <Metric>{metric}</Metric> */}
      <Compass degrees={degrees} metric={metric} title={title} />
    </Card>
  );
}

export default WindSpeedCard;
