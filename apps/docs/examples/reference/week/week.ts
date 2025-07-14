import { week } from "datezone";

const timestamp = 1720612800000; // 2024-07-10T12:00:00.000Z
const _weekNumber = week(timestamp, "America/New_York");
// weekNumber is 28
