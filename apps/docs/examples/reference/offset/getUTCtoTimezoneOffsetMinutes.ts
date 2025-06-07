import { getUTCtoTimezoneOffsetMinutes } from "datezone";

const timestamp = 1720612800000; // 2024-07-10T12:00:00.000Z
const offset = getUTCtoTimezoneOffsetMinutes(timestamp, "America/New_York");
console.log(offset); // -240 (America/New_York is UTC-5)
