'use client';

import { Card, Color, Text } from '@tremor/react';
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
      <Text className="text-white">{title}</Text>
      <Compass degrees={degrees} metric={metric} title={title} />
    </Card>
  );
}

export default WindSpeedCard;
