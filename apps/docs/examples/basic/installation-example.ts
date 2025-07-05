import { addDays, type TimeZone, toISOString } from "datezone";

// Save timeZone, preferably in a user setting
const timeZone: TimeZone = "Asia/Tokyo";

const now = Date.now();

// Add 5 days in the Asia/Tokyo timeZone
const result = addDays(now, 5, timeZone);

// Format the result in ISO string format in the Asia/Tokyo timeZone
// (YYYY-MM-DDTHH:mm:ss.sss+09:00)
console.log(toISOString(result, timeZone));
