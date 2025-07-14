import { addWeeks } from "datezone";

const timestamp = 1720612800000; // 2024-07-10T12:00:00.000Z
const _newDate = addWeeks(timestamp, 2, "America/New_York");
// newDate is 1721822400000 which is 2024-07-24T12:00:00.000Z
