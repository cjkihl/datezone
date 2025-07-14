import { WeekStartsOn, weeksInMonth } from "datezone";

const timestamp = 1720612800000; // 2024-07-10T12:00:00.000Z
const _weeks = weeksInMonth(timestamp, "America/New_York", WeekStartsOn.MONDAY);
// weeks is 5
