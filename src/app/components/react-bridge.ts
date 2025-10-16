import { Component, effect, ElementRef, input, OnDestroy, output, viewChild } from '@angular/core';

import * as React from 'react';
import { type Root, createRoot } from 'react-dom/client';

// Define type for the dynamic import function
export type ReactComponentLoader<T = any> = () => Promise<{ default: React.ComponentType<T> }>;

@Component({
  selector: 'react-bridge',
  imports: [],
  template: `<div #reactHost class="w-full h-full"></div>`,
})
export class ReactBridge implements OnDestroy {
  componentLoader = input.required<ReactComponentLoader>();
  props = input<any>({});
  event = output<unknown>();

  private _hostElement = viewChild.required<ElementRef<HTMLElement>>('reactHost');
  private _reactRoot: Root | null = null;

  constructor() {
    effect(async (onCleanUp) => {
      const loader = this.componentLoader();
      const props = this.props();
      const host = this._hostElement().nativeElement;

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
      } catch (error) {
        console.error('Failed to load or render React component:', error);

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
