import { isDST, isUTC, type NoDSTTimeZone } from "datezone";

const timezone: NoDSTTimeZone = "Asia/Tokyo";
const result1 = isDST(timezone);
console.log(result1); // false

const result2 = isUTC(timezone);
console.log(result2); // false
