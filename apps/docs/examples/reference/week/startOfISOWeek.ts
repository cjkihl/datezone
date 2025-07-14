import { startOfISOWeek } from "datezone";

const timestamp = 1720612800000; // 2024-07-10T12:00:00.000Z
const _start = startOfISOWeek(timestamp, "America/New_York");
// start is 1720411200000 which is 2024-07-08T04:00:00.000Z
