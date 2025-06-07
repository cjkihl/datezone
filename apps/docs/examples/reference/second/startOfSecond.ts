import { startOfSecond, toISOString } from "datezone";

const ts = 1700000000999; // 2023-11-14T22:13:20.999Z

// Get start of second
const start = startOfSecond(ts);
console.log(start, toISOString(start, "UTC")); // 1700000000000 (2023-11-14T22:13:20.000Z)
