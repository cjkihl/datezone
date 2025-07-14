import { subWeeks } from "datezone";

const timestamp = 1720612800000; // 2024-07-10T12:00:00.000Z
const _newDate = subWeeks(timestamp, 2, "America/New_York");
// newDate is 1719403200000 which is 2024-06-26T12:00:00.000Z
