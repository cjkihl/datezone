import { endOfPrevMonth } from "datezone";

const timestamp = 1720612800000; // 2024-07-10T12:00:00.000Z
const end = endOfPrevMonth(timestamp, "America/New_York");
console.log(end); // 1719806399999 (2024-07-01T03:59:59.999Z)
