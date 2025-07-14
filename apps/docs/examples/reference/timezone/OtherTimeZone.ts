import { isDST, isUTC, type OtherTimeZone } from "datezone";

const timezone: OtherTimeZone = "Asia/Tokyo";
const _result1 = isDST(timezone);
// result1 is false
const _result2 = isUTC(timezone);
// result2 is false
