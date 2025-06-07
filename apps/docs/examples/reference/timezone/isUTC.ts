import { isUTC, type UTCTimeZone } from "datezone";

const timezone: UTCTimeZone = "Africa/Dakar";
const result = isUTC(timezone);
console.log(result); // true
