import { format } from "datezone/format";

const launch = 1710436800000; // timestamp
console.log(format(launch, "yyyy-MM-dd HH:mm zzzz"));
// → "2024-03-14 15:00 America/New_York"
