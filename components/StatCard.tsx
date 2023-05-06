"use client";

import { Card, Metric, Text, Color } from "@tremor/react";

type Props = {
  title: string;
  metric: string;
  color?: Color;
};

function StatCard({ title, metric, color }: Props) {
  return (
    <Card 
    decoration="top" decorationColor={color}>
      <Text className="text-white">{title}</Text>
      <Metric className="text-white">{metric}</Metric>
    </Card>
  );
}

export default StatCard;