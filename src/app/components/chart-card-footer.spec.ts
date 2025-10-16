import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartCardFooter, ChartFooterData } from './chart-card-footer';
import { provideIcons } from '@ng-icons/core';
import { lucideTrendingUp } from '@ng-icons/lucide';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ChartCardFooter', () => {
  let component: ChartCardFooter;
  let fixture: ComponentFixture<ChartCardFooter>;

  const mockFooterData: ChartFooterData = {
    trendPercentage: '5.2',
    trendText: 'Trending up by 5.2% this month',
    dateRange: 'January - June 2024',
    iconName: 'lucideTrendingUp',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartCardFooter],
      providers: [provideIcons({ lucideTrendingUp }), provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartCardFooter);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display trend text', () => {
    fixture.componentRef.setInput('data', mockFooterData);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Trending up by 5.2% this month');
  });

  it('should display date range', () => {
    fixture.componentRef.setInput('data', mockFooterData);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('January - June 2024');
  });

  it('should render icon', () => {
    fixture.componentRef.setInput('data', mockFooterData);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const icon = compiled.querySelector('ng-icon');
    expect(icon).toBeTruthy();
  });

  it('should accept different footer data', () => {
    const customData: ChartFooterData = {
      trendPercentage: '10.5',
      trendText: 'Trending down by 10.5% this quarter',
      dateRange: 'Q1 2024',
      iconName: 'lucideTrendingUp',
    };

    fixture.componentRef.setInput('data', customData);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Trending down by 10.5% this quarter');
    expect(compiled.textContent).toContain('Q1 2024');
  });
});
