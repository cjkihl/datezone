import { subSeconds, toISOString } from "datezone";

const ts = 1700000000000; // 2023-11-14T22:13:20.000Z

// Subtract positive seconds
const fortyFiveSecondsAgo = subSeconds(ts, 45);
console.log(fortyFiveSecondsAgo, toISOString(fortyFiveSecondsAgo, "UTC")); // 1699999955000 (2023-11-14T22:12:35.000Z)

// Subtract negative seconds (adds)
const inSixtySeconds = subSeconds(ts, -60);
console.log(inSixtySeconds, toISOString(inSixtySeconds, "UTC")); // 1700000060000 (2023-11-14T22:14:20.000Z)

// Subtract many seconds
const oneHourAgo = subSeconds(ts, 3600);
console.log(oneHourAgo, toISOString(oneHourAgo, "UTC")); // 1699996400000 (2023-11-14T21:13:20.000Z)

// Example with specific timestamp
const specificTime = new Date("2023-12-25T15:30:00Z").getTime();
const minus15 = subSeconds(specificTime, 15);
const minus300 = subSeconds(specificTime, 300);

console.log(minus15, toISOString(minus15, "UTC")); // 1703518195000 (2023-12-25T15:29:45.000Z)
console.log(minus300, toISOString(minus300, "UTC")); // 1703517910000 (2023-12-25T15:25:10.000Z)
