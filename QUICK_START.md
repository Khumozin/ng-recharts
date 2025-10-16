# Quick Start Guide

## Project Structure

```
src/app/
├── components/
│   ├── react-bridge.ts           - Bridge between Angular and React
│   ├── chart-card.ts             - Reusable chart card wrapper
│   ├── chart-card-footer.ts      - Reusable chart footer
│   ├── *.tsx                     - React chart components
│   └── *.spec.ts                 - Unit tests
├── constants/
│   └── chart-data.ts             - Centralized chart data
└── pages/
    └── analytics.ts              - Main analytics page
```

## Common Tasks

### Add a New Chart

1. Create your React chart component in `components/`:
```tsx
// components/my-chart.tsx
export default function MyChart({ data }) {
  return <div>Your chart here</div>;
}
```

2. Add data to `constants/chart-data.ts`:
```typescript
export const MY_CHART_DATA = [
  { label: 'A', value: 100 },
  { label: 'B', value: 200 },
];
```

3. Update `analytics.ts`:
```typescript
protected readonly myChartData = signal(MY_CHART_DATA);

protected readonly chartConfigs = computed(() => [
  // ... existing charts
  {
    title: 'My Chart',
    description: 'Chart description',
    componentLoader: () => import('../components/my-chart'),
    props: this.myChartData(),
    footer: CHART_FOOTER_DATA,
  },
]);
```

### Update Chart Data

Simply modify the constants in `constants/chart-data.ts`:
```typescript
export const BAR_CHART_DATA: BarChartData[] = [
  { month: 'January', desktop: 200 },  // Changed from 186
  // ...
];
```

### Customize Footer

Edit `components/chart-card-footer.ts` or create different footer data:
```typescript
export const CUSTOM_FOOTER: ChartFooterData = {
  trendPercentage: '10.5',
  trendText: 'Custom trend text',
  dateRange: 'Q1 2024',
  iconName: 'lucideTrendingUp',
};
```

### Modify Card Layout

Edit `components/chart-card.ts` template to change all cards at once.

## Testing

### Run Tests
```bash
npm test                      # Run once
npm test -- --watch           # Watch mode
npm test -- --code-coverage   # With coverage
```

### Add Tests
Follow the pattern in existing `.spec.ts` files:
```typescript
describe('MyComponent', () => {
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

## Development

### Start Dev Server
```bash
npm start
# Open http://localhost:4200
```

### Build for Production
```bash
npm run build
# Output in dist/ng-recharts
```

### Code Quality
```bash
npm run lint              # (if configured)
prettier --write "src/**" # Format code
```

## Key Components

### ReactBridge
Bridges Angular and React components with:
- ✅ Type-safe props
- ✅ Loading states
- ✅ Error handling
- ✅ Automatic cleanup

### ChartCard
Reusable card wrapper with:
- Header (title + description)
- Content (React chart)
- Footer (trend info)

### ChartCardFooter
Displays:
- Trend percentage
- Trend text
- Date range
- Icon

## Tips

1. **Keep data centralized** in `constants/chart-data.ts`
2. **Use signals** for reactive data
3. **Write tests** for new components
4. **Follow TypeScript** strict mode
5. **Use computed()** for derived state
6. **Keep components small** (single responsibility)

## Troubleshooting

### Chart not loading
- Check browser console for errors
- Verify component loader path
- Ensure data format matches chart expectations

### Tests failing
- Run `npm test` to see specific errors
- Check that providers (icons, router) are included in test setup
- Verify mock data matches expected types

### Build errors
- Run `npm run build` to see TypeScript errors
- Check import paths are correct
- Verify all types are properly defined

## Next Steps

1. Add your own charts
2. Connect to a real API
3. Add more tests
4. Customize styling
5. Add animations
6. Implement filtering/sorting

## Resources

- [Angular Docs](https://angular.dev)
- [Recharts Docs](https://recharts.org)
- [Spartan UI](https://spartan.ng)
- Project improvements: See `IMPROVEMENTS.md`
- Before/After: See `BEFORE_AFTER.md`
