import { week } from "datezone";

const timestamp = Date.UTC(2024, 6, 10, 12, 0, 0); // 2024-07-10T12:00:00.000Z
const weekNumber = week(timestamp, "America/New_York");
console.log(weekNumber); // 28
