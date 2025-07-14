import { getISOWeekYear } from "datezone";

const timestamp = 1720612800000; // 2024-07-10T12:00:00.000Z
const _isoWeekYear = getISOWeekYear(timestamp, "America/New_York");
// isoWeekYear is 2024
