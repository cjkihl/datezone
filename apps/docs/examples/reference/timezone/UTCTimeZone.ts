import { isUTC, type UTCTimeZone } from "datezone";

const timezone: UTCTimeZone = "UTC";
const result = isUTC(timezone);
console.log(result); // true
