import { year } from "datezone";

const timestamp = Date.UTC(2024, 0, 1, 12, 0, 0, 0); // 2024-01-01T12:00:00.000Z
const y = year(timestamp, "UTC");
console.log(y); // 2024
