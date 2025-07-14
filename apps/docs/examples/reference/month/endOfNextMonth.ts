import { endOfNextMonth } from "datezone";

const timestamp = 1720612800000; // 2024-07-10T12:00:00.000Z
const _end = endOfNextMonth(timestamp, "America/New_York");
// end is 1725163199999 which is 2024-09-01T03:59:59.999Z
