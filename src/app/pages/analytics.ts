import { Component, computed, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideTrendingUp } from '@ng-icons/lucide';
import { ChartCard, ChartCardConfig } from '../components/chart-card';
import { ReactComponentLoader } from '../components/react-bridge';
import {
  AREA_CHART_DATA,
  BAR_CHART_DATA,
  CHART_FOOTER_DATA,
  LINE_CHART_DATA,
  PIE_CHART_DATA,
} from '../constants/chart-data';

@Component({
  selector: 'app-analytics',
  imports: [ChartCard],
  template: `
    @for (chartConfig of chartConfigs(); track chartConfig.title) {
      <app-chart-card [config]="chartConfig" />
    }
  `,
  providers: [provideIcons({ lucideTrendingUp })],
  host: {
    class: 'w-full h-screen flex items-center justify-center gap-4',
  },
})
export default class Analytics {
  private readonly barChartLoader: ReactComponentLoader = () => import('../components/bar-chart');
  private readonly areaChartLoader: ReactComponentLoader = () =>
    import('../components/chart-area-interactive');
  private readonly lineChartLoader: ReactComponentLoader = () =>
    import('../components/chart-line-multiple');
  private readonly pieChartLoader: ReactComponentLoader = () =>
    import('../components/chart-pie-donut-text');

  protected readonly barChartData = signal({ data: BAR_CHART_DATA });
  protected readonly areaChartData = signal(AREA_CHART_DATA);
  protected readonly lineChartData = signal(LINE_CHART_DATA);
  protected readonly pieChartData = signal(PIE_CHART_DATA);

  protected readonly chartConfigs = computed<ChartCardConfig[]>(() => [
    {
      title: 'Bar Chart',
      description: 'January - June 2025',
      componentLoader: this.barChartLoader,
      props: this.barChartData(),
      footer: CHART_FOOTER_DATA,
    },
    {
      title: 'Area Chart - Legend',
      description: 'Showing total visitors for the last 6 months',
      componentLoader: this.areaChartLoader,
      props: this.areaChartData(),
      footer: CHART_FOOTER_DATA,
    },
    {
      title: 'Line Chart - Multiple',
      description: 'January - June 2024',
      componentLoader: this.lineChartLoader,
      props: this.lineChartData(),
      footer: CHART_FOOTER_DATA,
    },
    {
      title: 'Pie Chart - Donut with Text',
      description: 'January - June 2024',
      componentLoader: this.pieChartLoader,
      props: this.pieChartData(),
      footer: CHART_FOOTER_DATA,
    },
  ]);
}
