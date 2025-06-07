import { getUTCtoLocalOffsetMinutes } from "datezone";

const timestamp = 1720612800000; // 2024-07-10T12:00:00.000Z
const offset = getUTCtoLocalOffsetMinutes(timestamp);
console.log(offset); // 780 (Depends on the local timezone)
