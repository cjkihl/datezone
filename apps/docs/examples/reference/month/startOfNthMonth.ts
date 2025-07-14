import { startOfNthMonth } from "datezone";

const timestamp = 1720612800000; // 2024-07-10T12:00:00.000Z
const _start = startOfNthMonth(timestamp, 2, "America/New_York");
// start is 1725163200000 which is 2024-09-01T04:00:00.000Z
