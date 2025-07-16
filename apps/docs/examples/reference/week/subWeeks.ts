import { subWeeks, toISOString } from "datezone";

const timestamp = Date.UTC(2024, 6, 10, 12, 0, 0); // 2024-07-10T12:00:00.000Z
const twoWeeksAgo = subWeeks(timestamp, 2, "America/New_York");
console.log(twoWeeksAgo, toISOString(twoWeeksAgo, "UTC")); // 1719374400000 2024-06-26T04:00:00.000Z
