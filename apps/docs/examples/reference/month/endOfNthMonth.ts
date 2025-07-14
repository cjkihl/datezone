import { endOfNthMonth } from "datezone";

const timestamp = 1720612800000; // 2024-07-10T12:00:00.000Z
const _end = endOfNthMonth(timestamp, 2, "America/New_York");
// end is 1727755199999 which is 2024-10-01T03:59:59.999Z
