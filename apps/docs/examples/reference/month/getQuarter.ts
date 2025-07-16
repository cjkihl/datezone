import { getQuarter } from "datezone";

const timestamp = 1720612800000; // 2024-07-10T12:00:00.000Z
const quarter = getQuarter(timestamp, "America/New_York");
console.log(quarter); // 3
