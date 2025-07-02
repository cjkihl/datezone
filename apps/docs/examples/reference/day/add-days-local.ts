import { addDays, toISOString } from "datezone";

const now = Date.now();

// Add 5 days in whatever timezone the browser or server is using. (Unsafe)
const result = addDays(now, 5, null);

// Format the result as ISO string in whatever timezone the browser or server is using (Unsafe)
// (YYYY-MM-DDTHH:mm:ss.sss±HH:MM)
console.log(toISOString(result, null));
