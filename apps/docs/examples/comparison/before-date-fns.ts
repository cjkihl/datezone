// Multiple packages, complex setup
// This example shows the complexity of date-fns + timezone approach
// (imports commented to avoid dependency errors in this demo project)

// import { addDays, format } from "date-fns";
// import { zonedTimeToUtc, utcToZonedTime } from "date-fns-tz";

// Verbose, error-prone approach requires multiple steps:
const _date = new Date();

// Step 1: Convert local time to UTC for the specific timezone
// const utcDate = zonedTimeToUtc(date, "America/New_York");

// Step 2: Perform the date arithmetic
// const newDate = addDays(utcDate, 5);

// Step 3: Convert back to the target timezone and format
// const _result = format(
//   utcToZonedTime(newDate, "America/New_York"),
//   "yyyy-MM-dd"
// );
