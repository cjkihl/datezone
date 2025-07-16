import { subMilliseconds, toISOString } from "datezone";

const ts = 1700000000000; // 2023-11-14T22:13:20.000Z

// Subtract positive milliseconds
const minus300 = subMilliseconds(ts, 300);
console.log(minus300, toISOString(minus300, "UTC")); // 1699999999700 (2023-11-14T22:13:19.700Z)

// Subtract negative milliseconds (adds)
const plus700 = subMilliseconds(ts, -700);
console.log(plus700, toISOString(plus700, "UTC")); // 1700000000700 (2023-11-14T22:13:20.700Z)
