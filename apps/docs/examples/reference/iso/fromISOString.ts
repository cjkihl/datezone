import { fromISOString } from "datezone";

// Parse different ISO string formats
console.log("Parsing various ISO string formats:");

// UTC timezone (with Z)
const utcString = "2023-12-25T15:30:45.123Z";
const utcTimestamp = fromISOString(utcString);
console.log(`UTC: ${utcString} → ${utcTimestamp}`);

// With timezone offset
const offsetString = "2023-12-25T15:30:45.123+05:30";
const offsetTimestamp = fromISOString(offsetString);
console.log(`With offset: ${offsetString} → ${offsetTimestamp}`);

// Local time (no timezone)
const localString = "2023-12-25T15:30:45.123";
const localTimestamp = fromISOString(localString);
console.log(`Local: ${localString} → ${localTimestamp}`);

// Without milliseconds
const noMsString = "2023-12-25T15:30:45-08:00";
const noMsTimestamp = fromISOString(noMsString);
console.log(`No ms: ${noMsString} → ${noMsTimestamp}`);
