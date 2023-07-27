'use client';

import { Card, AreaChart, Title } from '@tremor/react';
import React from 'react';

type Props = {
  results: Root;
};

function RainChart({ results }: Props) {
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
    'Rain (%)': results?.hourly.precipitation_probability[i],
  }));

  const dataFormatter = (number: number) => `${number} %`;

  return (
    <Card>
      <Title>Chance of Rain</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        categories={['Rain (%)']}
        colors={['blue']}
        minValue={0}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
}

export default RainChart;
