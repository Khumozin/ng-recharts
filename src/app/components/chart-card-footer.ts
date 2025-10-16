import { Component, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';

export interface ChartFooterData {
  trendPercentage: string;
  trendText: string;
  dateRange: string;
  iconName: string;
}

@Component({
  selector: 'app-chart-card-footer',
  imports: [NgIcon, HlmIcon],
  template: `
    <div class="flex w-full items-start gap-2 text-sm">
      <div class="grid gap-2">
        <div class="flex items-center gap-2 leading-none font-medium">
          {{ data().trendText }} <ng-icon hlm size="sm" [name]="data().iconName" />
        </div>
        <div class="text-muted-foreground flex items-center gap-2 leading-none">
          {{ data().dateRange }}
        </div>
      </div>
    </div>
  `,
})
export class ChartCardFooter {
  data = input.required<ChartFooterData>();
}
