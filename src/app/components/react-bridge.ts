import { Component, effect, ElementRef, input, OnDestroy, output, signal, viewChild } from '@angular/core';

import * as React from 'react';
import { type Root, createRoot } from 'react-dom/client';

export type ReactComponentLoader<T = Record<string, unknown>> = () => Promise<{
  default: React.ComponentType<T>;
}>;

@Component({
  selector: 'react-bridge',
  imports: [],
  template: `
    <div #reactHost class="w-full h-full">
      @if (isLoading()) {
        <div class="flex items-center justify-center h-full">
          <p class="text-muted-foreground text-sm">Loading chart...</p>
        </div>
      }
      @if (error()) {
        <div class="flex items-center justify-center h-full">
          <p class="text-destructive text-sm">Failed to load chart. Please try again.</p>
        </div>
      }
    </div>
  `,
})
export class ReactBridge implements OnDestroy {
  componentLoader = input.required<ReactComponentLoader>();
  props = input<Record<string, unknown>>({});
  event = output<unknown>();

  readonly isLoading = signal(true);
  readonly error = signal(false);

  private _hostElement = viewChild.required<ElementRef<HTMLElement>>('reactHost');
  private _reactRoot: Root | null = null;

  constructor() {
    effect(async (onCleanUp) => {
      const loader = this.componentLoader();
      const props = this.props();
      const host = this._hostElement().nativeElement;

      this.isLoading.set(true);
      this.error.set(false);

      try {
        const { default: Component } = await loader();

        if (!this._reactRoot) {
          this._reactRoot = createRoot(host);
        }

        const reactElement = React.createElement(Component, {
          ...props,
          onEvent: (data: unknown) => this.event.emit(data),
        });

        this._reactRoot.render(reactElement);
        this.isLoading.set(false);
      } catch (err) {
        console.error('Failed to load or render React component:', err);
        this.error.set(true);
        this.isLoading.set(false);

        this._reactRoot?.unmount();
        this._reactRoot = null;
      }

      onCleanUp(() => {
        this._reactRoot?.unmount();
        this._reactRoot = null;
      });
    });
  }

  ngOnDestroy(): void {
    this._reactRoot?.unmount();
  }
}
