import { endOfPrevMonth } from "datezone";

const timestamp = 1720612800000; // 2024-07-10T12:00:00.000Z
const _end = endOfPrevMonth(timestamp, "America/New_York");
// end is 1719806399999 which is 2024-07-01T03:59:59.999Z
