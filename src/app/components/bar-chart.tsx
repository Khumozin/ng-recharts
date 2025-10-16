import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from './chart-components';

export interface BarChartData {
  month: string;
  desktop: number;
}

export interface BarChartProps {
  data?: BarChartData[];
  config?: ChartConfig;
}

const defaultChartData: BarChartData[] = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
];

const defaultChartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--foreground))',
  },
} satisfies ChartConfig;

export default function BarChartComponent({
  data = defaultChartData,
  config = defaultChartConfig,
}) {
  return (
    <ChartContainer config={config}>
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="desktop" fill="var(--foreground)" radius={8} />
      </BarChart>
    </ChartContainer>
  );
};