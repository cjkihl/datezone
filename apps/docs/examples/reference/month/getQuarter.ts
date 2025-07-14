import { getQuarter } from "datezone";

const timestamp = 1720612800000; // 2024-07-10T12:00:00.000Z
const _quarter = getQuarter(timestamp, "America/New_York");
// quarter is 3
