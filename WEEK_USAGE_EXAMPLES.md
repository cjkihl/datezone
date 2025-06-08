# Week Functions Usage Examples

## Basic Usage

```typescript
import { 
  startOfWeek, 
  endOfWeek, 
  getWeeksInMonth, 
  WeekStartsOn 
} from './packages/datezone/week';

const date = { year: 2023, month: 6, day: 15 }; // Thursday, June 15, 2023
```

## Different Week Start Styles

### ISO/European Style (Monday start) - Default
```typescript
// Default behavior (Monday start)
const mondayStart = startOfWeek(date, "UTC");
const mondayEnd = endOfWeek(date, "UTC");

// Explicit Monday start
const isoStart = startOfWeek(date, "UTC", WeekStartsOn.MONDAY);
const isoEnd = endOfWeek(date, "UTC", WeekStartsOn.MONDAY);

// Result: Monday June 12 00:00:00 to Sunday June 18 23:59:59
```

### US Style (Sunday start)
```typescript
const usStart = startOfWeek(date, "UTC", WeekStartsOn.SUNDAY);
const usEnd = endOfWeek(date, "UTC", WeekStartsOn.SUNDAY);

// Result: Sunday June 11 00:00:00 to Saturday June 17 23:59:59
```

### Middle East Style (Saturday start)
```typescript
const meStart = startOfWeek(date, "UTC", WeekStartsOn.SATURDAY);
const meEnd = endOfWeek(date, "UTC", WeekStartsOn.SATURDAY);

// Result: Saturday June 10 00:00:00 to Friday June 16 23:59:59
```

## Calendar Weeks in Month

### Different Calendar Layouts
```typescript
const january2023 = { year: 2023, month: 1, day: 1 };

// US Calendar (Sunday start) - 5 weeks needed
const usWeeks = getWeeksInMonth(january2023, "UTC", WeekStartsOn.SUNDAY);
// Result: 5

// European Calendar (Monday start) - 6 weeks needed  
const euroWeeks = getWeeksInMonth(january2023, "UTC", WeekStartsOn.MONDAY);
// Result: 6

// Middle East Calendar (Saturday start) - 5 weeks needed
const meWeeks = getWeeksInMonth(january2023, "UTC", WeekStartsOn.SATURDAY);
// Result: 5
```

## ISO Week Functions (Convenience)

```typescript
import { startOfISOWeek, endOfISOWeek } from './packages/datezone/week';

// These are equivalent to using WeekStartsOn.MONDAY
const isoStart = startOfISOWeek(date, "UTC");
const manualIsoStart = startOfWeek(date, "UTC", WeekStartsOn.MONDAY);
// isoStart === manualIsoStart (true)
```

## Performance Optimized Operations

### UTC Fast Path
```typescript
// When working with UTC timestamps, these are optimized:
const timestamp = Date.UTC(2023, 5, 15);

// Fast path - pure arithmetic
const twoWeeksLater = addWeeks(timestamp, 2, "UTC");
const oneWeekEarlier = subWeeks(timestamp, 1, "UTC");
```

### Timezone-Aware Operations
```typescript
// Handles DST transitions correctly
const nycDate = { year: 2023, month: 3, day: 12 }; // DST transition day

const weekStart = startOfWeek(nycDate, "America/New_York", WeekStartsOn.SUNDAY);
const weekEnd = endOfWeek(nycDate, "America/New_York", WeekStartsOn.SUNDAY);

// Automatically handles spring forward
const nextWeek = addWeeks(nycDate, 1, "America/New_York");
```

## Real-World Scenarios

### Building a Calendar Component
```typescript
function getCalendarWeeks(year: number, month: number, locale: string) {
  const weekStart = locale === 'en-US' ? WeekStartsOn.SUNDAY : WeekStartsOn.MONDAY;
  
  return {
    weeksNeeded: getWeeksInMonth({ year, month, day: 1 }, "UTC", weekStart),
    firstWeekStart: startOfWeek({ year, month, day: 1 }, "UTC", weekStart),
    lastWeekEnd: endOfWeek({ year, month, day: 31 }, "UTC", weekStart)
  };
}

// US Calendar
const usCalendar = getCalendarWeeks(2023, 1, 'en-US');
// European Calendar  
const euCalendar = getCalendarWeeks(2023, 1, 'en-GB');
```

### Business Week Calculations
```typescript
function getBusinessWeek(date: Date, region: 'US' | 'EU' | 'ME') {
  const weekStart = {
    'US': WeekStartsOn.SUNDAY,    // Sunday-Saturday
    'EU': WeekStartsOn.MONDAY,    // Monday-Sunday
    'ME': WeekStartsOn.SATURDAY   // Saturday-Friday
  }[region];
  
  const timestamp = date.getTime();
  
  return {
    start: startOfWeek(timestamp, "UTC", weekStart),
    end: endOfWeek(timestamp, "UTC", weekStart),
    weeksInMonth: getWeeksInMonth(timestamp, "UTC", weekStart)
  };
}
```

### Date Range Operations
```typescript
function getQuarterWeeks(year: number, quarter: number, weekStyle: WeekStartsOn) {
  const startMonth = (quarter - 1) * 3 + 1;
  const endMonth = quarter * 3;
  
  // Get start of first week in quarter
  const quarterStart = startOfWeek(
    { year, month: startMonth, day: 1 }, 
    "UTC", 
    weekStyle
  );
  
  // Get end of last week in quarter
  const lastDayOfQuarter = new Date(year, endMonth, 0).getDate();
  const quarterEnd = endOfWeek(
    { year, month: endMonth, day: lastDayOfQuarter }, 
    "UTC", 
    weekStyle
  );
  
  // Calculate total weeks
  const totalWeeks = Math.ceil((quarterEnd - quarterStart) / (7 * 24 * 60 * 60 * 1000));
  
  return { quarterStart, quarterEnd, totalWeeks };
}
```

## Type Safety

```typescript
// All enum values are type-safe
const validStarts: WeekStartsOn[] = [
  WeekStartsOn.SUNDAY,    // 0
  WeekStartsOn.MONDAY,    // 1  
  WeekStartsOn.TUESDAY,   // 2
  WeekStartsOn.WEDNESDAY, // 3
  WeekStartsOn.THURSDAY,  // 4
  WeekStartsOn.FRIDAY,    // 5
  WeekStartsOn.SATURDAY   // 6
];

// TypeScript will catch invalid values
// const invalid = startOfWeek(date, "UTC", 8); // Error!
```

## Performance Tips

1. **Use UTC when possible** for bulk operations
2. **Cache week boundaries** for frequently accessed dates  
3. **Batch timezone operations** to minimize conversions
4. **Choose appropriate week start** for your use case - all have same performance 