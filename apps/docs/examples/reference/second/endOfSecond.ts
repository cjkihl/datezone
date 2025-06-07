import { endOfSecond, toISOString } from "datezone";

const ts = 1700000000000; // 2023-11-14T22:13:20.000Z

// Get end of second
const end = endOfSecond(ts);
console.log(end, toISOString(end, "UTC")); // 1700000000999 (2023-11-14T22:13:20.999Z)
