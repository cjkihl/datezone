import { isSameWeek } from "datezone";

const ts1 = Date.UTC(2024, 0, 15); // Jan 15, 2024 (Monday)
const ts2 = Date.UTC(2024, 0, 16); // Jan 16, 2024 (Tuesday)

console.log(isSameWeek(ts1, ts2, "UTC")); // true
