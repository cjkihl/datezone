import { addDays, type TimeZone, toISOString } from "datezone";

// Save timezone, preferably in a user setting
const timezone: TimeZone = "Asia/Tokyo";

const now = Date.now();

// Add 5 days in the Asia/Tokyo timezone
const result = addDays(now, 5, timezone);

// Format the result in ISO string format in the Asia/Tokyo timezone
// (YYYY-MM-DDTHH:mm:ss.sss+09:00)
console.log(toISOString(result, timezone));
