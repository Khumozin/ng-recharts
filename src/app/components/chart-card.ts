import { Component, input } from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { ReactBridge, ReactComponentLoader } from './react-bridge';
import { ChartCardFooter, ChartFooterData } from './chart-card-footer';

export interface ChartCardConfig {
  title: string;
  description: string;
  componentLoader: ReactComponentLoader;
  props: any;
  footer: ChartFooterData;
}

@Component({
  selector: 'app-chart-card',
  imports: [HlmCardImports, ReactBridge, ChartCardFooter],
  template: `
    <section hlmCard class="w-96">
      <div hlmCardHeader>
        <h3 hlmCardTitle>{{ config().title }}</h3>
        <p hlmCardDescription>{{ config().description }}</p>
      </div>
      <div hlmCardContent class="flex-1 pb-0">
        <react-bridge
          [componentLoader]="config().componentLoader"
          [props]="config().props"
          class="w-full h-full"
        />
      </div>
      <div hlmCardFooter>
        <app-chart-card-footer [data]="config().footer" />
      </div>
    </section>
  `,
})
export class ChartCard {
  config = input.required<ChartCardConfig>();
}
