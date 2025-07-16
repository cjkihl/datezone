import { addSeconds, toISOString } from "datezone";

const ts = 1700000000000; // 2023-11-14T22:13:20.000Z

// Add positive seconds
const inThirtySeconds = addSeconds(ts, 30);
console.log(inThirtySeconds, toISOString(inThirtySeconds, "UTC")); // 1700000030000 (2023-11-14T22:13:50.000Z)

// Add negative seconds (subtract)
const thirtySecondsAgo = addSeconds(ts, -30);
console.log(thirtySecondsAgo, toISOString(thirtySecondsAgo, "UTC")); // 1699999970000 (2023-11-14T22:12:50.000Z)

// Add many seconds
const inOneHour = addSeconds(ts, 3600);
console.log(inOneHour, toISOString(inOneHour, "UTC")); // 1700003600000 (2023-11-14T23:13:20.000Z)

// Example with specific timestamp
const specificTime = new Date("2023-12-25T10:00:00Z").getTime();
const plus45 = addSeconds(specificTime, 45);
const minus120 = addSeconds(specificTime, -120);

console.log(plus45, toISOString(plus45, "UTC")); // 1703498445000 (2023-12-25T10:00:45.000Z)
console.log(minus120, toISOString(minus120, "UTC")); // 1703498280000 (2023-12-25T09:58:00.000Z)
