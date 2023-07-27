'use client';

import { Card, AreaChart, Title } from '@tremor/react';
import React from 'react';

type Props = {
  results: Root;
};

function TempChart({ results }: Props) {
  const hourly = results?.hourly.time
    .map((time) =>
      new Date(time).toLocaleString('en-US', {
        hour: 'numeric',
        hour12: true,
      })
    )
    .slice(0, 24);

  const tempString = 'Temperature (F)';
  const data = hourly.map((hour, i) => ({
    time: hour,
    'UV Index': results.hourly.uv_index[i],
    [tempString]: results.hourly.temperature_2m[i],
  }));

  const dataFormatter = (number: number) => `${number}`;

  return (
    <Card>
      <Title>Temperature & UV Index</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        categories={[tempString, 'UV Index']}
        colors={['yellow', 'rose']}
        minValue={0}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
}

export default TempChart;
