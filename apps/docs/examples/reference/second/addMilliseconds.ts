import { addMilliseconds, toISOString } from "datezone";

const ts = 1700000000000; // 2023-11-14T22:13:20.000Z

// Add positive milliseconds
const plus500 = addMilliseconds(ts, 500);
console.log(plus500, toISOString(plus500, "UTC")); // 1700000500000 (2023-11-14T22:13:20.500Z)

// Add negative milliseconds
const minus500 = addMilliseconds(ts, -500);
console.log(minus500, toISOString(minus500, "UTC")); // 1699999500000 (2023-11-14T22:13:19.500Z)
