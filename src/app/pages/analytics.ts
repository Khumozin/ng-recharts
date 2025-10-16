import { Component, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTrendingUp } from '@ng-icons/lucide';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmIcon } from '@spartan-ng/helm/icon';
// Import the new ReactBridge component and the loader type
import type { BarChartData } from '../components/bar-chart';
import type { AreaChartData } from '../components/chart-area-interactive';
import type { LineChartData } from '../components/chart-line-multiple';
import { ReactBridge, ReactComponentLoader } from '../components/react-bridge';

@Component({
  selector: 'app-analytics',
  imports: [NgIcon, HlmIcon, HlmCardImports, ReactBridge],
  template: `
    <section hlmCard class="w-96">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Bar Chart</h3>
        <p hlmCardDescription>January - June 2025</p>
      </div>
      <div hlmCardContent class="flex-1 pb-0">
        <react-bridge
          [componentLoader]="barChartComponentLoader"
          [props]="barChartProps()"
          class="w-full h-full"
        />
      </div>
      <div hlmCardFooter>
        <div class="flex w-full items-start gap-2 text-sm">
          <div class="grid gap-2">
            <div class="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <ng-icon hlm size="sm" name="lucideTrendingUp" />
            </div>
            <div class="text-muted-foreground flex items-center gap-2 leading-none">
              January - June 2024
            </div>
          </div>
        </div>
      </div>
    </section>

    <section hlmCard class="w-96">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Area Chart - Legend</h3>
        <p hlmCardDescription>Showing total visitors for the last 6 months</p>
      </div>
      <div hlmCardContent class="flex-1 pb-0">
        <react-bridge
          [componentLoader]="areaChartComponentLoader"
          [props]="areaChartProps()"
          class="w-full h-full"
        />
      </div>
      <div hlmCardFooter>
        <div class="flex w-full items-start gap-2 text-sm">
          <div class="grid gap-2">
            <div class="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <ng-icon hlm size="sm" name="lucideTrendingUp" />
            </div>
            <div class="text-muted-foreground flex items-center gap-2 leading-none">
              January - June 2024
            </div>
          </div>
        </div>
      </div>
    </section>

    <section hlmCard class="w-96">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Line Chart - Multiple</h3>
        <p hlmCardDescription>January - June 2024</p>
      </div>
      <div hlmCardContent class="flex-1 pb-0">
        <react-bridge
          [componentLoader]="lineChartComponentLoader"
          [props]="lineChartProps()"
          class="w-full h-full"
        />
      </div>
      <div hlmCardFooter>
        <div class="flex w-full items-start gap-2 text-sm">
          <div class="grid gap-2">
            <div class="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <ng-icon hlm size="sm" name="lucideTrendingUp" />
            </div>
            <div class="text-muted-foreground flex items-center gap-2 leading-none">
              January - June 2024
            </div>
          </div>
        </div>
      </div>
    </section>

    <section hlmCard class="w-96">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Pie Chart - Donut with Text</h3>
        <p hlmCardDescription>January - June 2024</p>
      </div>
      <div hlmCardContent class="flex-1 pb-0">
        <react-bridge
          [componentLoader]="pieChartComponentLoader"
          [props]="pieChartProps()"
          class="w-full h-full"
        />
      </div>
      <div hlmCardFooter>
        <div class="flex w-full items-start gap-2 text-sm">
          <div class="grid gap-2">
            <div class="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <ng-icon hlm size="sm" name="lucideTrendingUp" />
            </div>
            <div class="text-muted-foreground flex items-center gap-2 leading-none">
              January - June 2024
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  providers: [provideIcons({ lucideTrendingUp })],
  host: {
    class: 'w-full h-screen flex items-center justify-center gap-4',
  },
})
export default class Analytics {
  // Define the loader as a function that performs a dynamic import.
  // This tells the bundler to create a separate file for 'bar-chart'.
  barChartComponentLoader: ReactComponentLoader = () => import('../components/bar-chart');
  areaChartComponentLoader: ReactComponentLoader = () =>
    import('../components/chart-area-interactive');
  lineChartComponentLoader: ReactComponentLoader = () =>
    import('../components/chart-line-multiple');
  pieChartComponentLoader: ReactComponentLoader = () =>
    import('../components/chart-pie-donut-text');

  // Use a signal for props to enable reactivity.
  // If you change this signal's value, the effect in ReactBridge will re-render the chart.
  barChartProps = signal({
    data: [
      { month: 'January', desktop: 186 },
      { month: 'February', desktop: 305 },
      { month: 'March', desktop: 237 },
      { month: 'April', desktop: 73 },
      { month: 'May', desktop: 209 },
      { month: 'June', desktop: 214 },
    ] as BarChartData[],
  });

  areaChartProps = signal([
    { month: 'January', desktop: 186, mobile: 80 },
    { month: 'February', desktop: 305, mobile: 200 },
    { month: 'March', desktop: 237, mobile: 120 },
    { month: 'April', desktop: 73, mobile: 190 },
    { month: 'May', desktop: 209, mobile: 130 },
    { month: 'June', desktop: 214, mobile: 140 },
  ] as AreaChartData[]);

  lineChartProps = signal([
    { month: 'January', desktop: 186, mobile: 80 },
    { month: 'February', desktop: 305, mobile: 200 },
    { month: 'March', desktop: 237, mobile: 120 },
    { month: 'April', desktop: 73, mobile: 190 },
    { month: 'May', desktop: 209, mobile: 130 },
    { month: 'June', desktop: 214, mobile: 140 },
  ] as LineChartData[]);

  pieChartProps = signal([
    { browser: 'chrome', visitors: 275, fill: 'var(--foreground)' },
    { browser: 'safari', visitors: 200, fill: 'var(--muted-foreground)' },
    { browser: 'firefox', visitors: 287, fill: 'var(--border)' },
    { browser: 'edge', visitors: 173, fill: 'var(--muted)' },
    { browser: 'other', visitors: 190, fill: 'var(--accent)' },
  ]);
}
