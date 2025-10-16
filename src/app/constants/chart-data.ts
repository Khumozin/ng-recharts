import type { AreaChartData } from '../components/chart-area-interactive';
import type { BarChartData } from '../components/bar-chart';
import type { LineChartData } from '../components/chart-line-multiple';
import type { ChartFooterData } from '../components/chart-card-footer';

export const BAR_CHART_DATA: BarChartData[] = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
];

export const AREA_CHART_DATA: AreaChartData[] = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

export const LINE_CHART_DATA: LineChartData[] = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

export interface PieChartData {
  browser: string;
  visitors: number;
  fill: string;
}

export const PIE_CHART_DATA: PieChartData[] = [
  { browser: 'chrome', visitors: 275, fill: 'var(--foreground)' },
  { browser: 'safari', visitors: 200, fill: 'var(--accent)' },
  { browser: 'firefox', visitors: 287, fill: 'var(--border)' },
  { browser: 'edge', visitors: 173, fill: 'var(--muted-foreground)' },
  { browser: 'other', visitors: 190, fill: 'var(--muted)' },
];

export const CHART_FOOTER_DATA: ChartFooterData = {
  trendPercentage: '5.2',
  trendText: 'Trending up by 5.2% this month',
  dateRange: 'January - June 2024',
  iconName: 'lucideTrendingUp',
};
