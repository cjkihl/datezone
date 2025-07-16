import { endOfNextMonth } from "datezone";

const timestamp = 1720612800000; // 2024-07-10T12:00:00.000Z
const end = endOfNextMonth(timestamp, "America/New_York");
console.log(end); // 1725163199999 (2024-09-01T03:59:59.999Z)
