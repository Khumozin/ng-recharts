import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactBridge, ReactComponentLoader } from './react-bridge';
import * as React from 'react';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ReactBridge', () => {
  let component: ReactBridge;
  let fixture: ComponentFixture<ReactBridge>;

  const mockReactComponent = () => React.createElement('div', {}, 'Test Component');

  const mockLoader: ReactComponentLoader = () =>
    Promise.resolve({
      default: mockReactComponent as any,
    });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactBridge],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactBridge);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have loading state initially', () => {
    expect(component.isLoading()).toBe(true);
    expect(component.error()).toBe(false);
  });

  it('should show loading message initially', () => {
    fixture.componentRef.setInput('componentLoader', mockLoader);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const loadingText = compiled.textContent?.includes('Loading chart...');
    expect(loadingText).toBe(true);
  });

  it('should accept componentLoader input', () => {
    fixture.componentRef.setInput('componentLoader', mockLoader);
    expect(component.componentLoader()).toBe(mockLoader);
  });

  it('should accept props input', () => {
    const testProps = { data: [1, 2, 3] };
    fixture.componentRef.setInput('props', testProps);
    expect(component.props()).toEqual(testProps);
  });

  it('should have default empty props', () => {
    fixture.componentRef.setInput('componentLoader', mockLoader);
    expect(component.props()).toEqual({});
  });

  it('should handle loader errors gracefully', async () => {
    const errorLoader: ReactComponentLoader = () => Promise.reject(new Error('Load failed'));

    fixture.componentRef.setInput('componentLoader', errorLoader);
    fixture.detectChanges();

    // Wait for async operation
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.error()).toBe(true);
    expect(component.isLoading()).toBe(false);
  });

  it('should display error message when loading fails', async () => {
    const errorLoader: ReactComponentLoader = () => Promise.reject(new Error('Load failed'));

    fixture.componentRef.setInput('componentLoader', errorLoader);
    fixture.detectChanges();

    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const errorText = compiled.textContent?.includes('Failed to load chart');
    expect(errorText).toBe(true);
  });

  it('should clean up React root on destroy', () => {
    fixture.componentRef.setInput('componentLoader', mockLoader);
    fixture.detectChanges();

    const unmountSpy = jasmine.createSpy('unmount');
    (component as any)._reactRoot = { unmount: unmountSpy };

    fixture.destroy();

    expect(unmountSpy).toHaveBeenCalled();
  });
});
