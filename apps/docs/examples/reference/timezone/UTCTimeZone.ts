import { isUTC, type UTCTimeZone } from "datezone";

const timezone: UTCTimeZone = "UTC";
const _result = isUTC(timezone);
// result is true
