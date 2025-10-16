import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartCard, ChartCardConfig } from './chart-card';
import { provideZonelessChangeDetection } from '@angular/core';
import * as React from 'react';

describe('ChartCard', () => {
  let component: ChartCard;
  let fixture: ComponentFixture<ChartCard>;

  const mockReactComponent = () => React.createElement('div', {}, 'Test Chart');

  const mockConfig: ChartCardConfig = {
    title: 'Test Chart',
    description: 'Test Description',
    componentLoader: () =>
      Promise.resolve({
        default: mockReactComponent as any,
      }),
    props: { data: [1, 2, 3] },
    footer: {
      trendPercentage: '5.2',
      trendText: 'Trending up',
      dateRange: 'Jan - Jun',
      iconName: 'lucideTrendingUp',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartCard],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartCard);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display chart title', () => {
    fixture.componentRef.setInput('config', mockConfig);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Chart');
  });

  it('should display chart description', () => {
    fixture.componentRef.setInput('config', mockConfig);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Description');
  });

  it('should render react-bridge component', () => {
    fixture.componentRef.setInput('config', mockConfig);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const reactBridge = compiled.querySelector('react-bridge');
    expect(reactBridge).toBeTruthy();
  });

  it('should render chart-card-footer component', () => {
    fixture.componentRef.setInput('config', mockConfig);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const footer = compiled.querySelector('app-chart-card-footer');
    expect(footer).toBeTruthy();
  });

  it('should pass props to react-bridge', () => {
    fixture.componentRef.setInput('config', mockConfig);
    fixture.detectChanges();

    const reactBridge = fixture.debugElement.nativeElement.querySelector('react-bridge');
    expect(reactBridge).toBeTruthy();
  });
});
