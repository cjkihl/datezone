import { startOfMonth } from "datezone";

const timestamp = 1720612800000; // 2024-07-10T12:00:00.000Z
const _start = startOfMonth(timestamp, "America/New_York");
// start is 1719806400000 which is 2024-07-01T04:00:00.000Z
