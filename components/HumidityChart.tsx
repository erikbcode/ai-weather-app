'use client';

import { Card, AreaChart, Title } from '@tremor/react';
import React from 'react';

type Props = {
  results: Root;
};

function HumidityChart({ results }: Props) {
  const hourly = results?.hourly.time
    .map((time) =>
      new Date(time).toLocaleString('en-US', {
        hour: 'numeric',
        hour12: true,
      })
    )
    .slice(0, 24);

  const data = hourly.map((hour, i) => ({
    time: hour,
    'Humidity (%)': results?.hourly.relativehumidity_2m[i],
  }));

  const dataFormatter = (number: number) => `${number} %`;

  return (
    <Card>
      <Title>Humidity Levels</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        categories={['Humidity (%)']}
        colors={['purple']}
        minValue={0}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
}

export default HumidityChart;
