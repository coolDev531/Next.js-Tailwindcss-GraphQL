'use client';

import { Card, Color } from '@tremor/react';
import Compass from './Compass';

type Props = {
  title: string;
  metric: string;
  color?: Color;
  degrees: number;
};

function WindSpeedCard({ title, metric, color, degrees }: Props) {
  return (
    <Card decoration="top" decorationColor={color}>
      <Compass degrees={degrees} metric={metric} title={title} />
    </Card>
  );
}

export default WindSpeedCard;
