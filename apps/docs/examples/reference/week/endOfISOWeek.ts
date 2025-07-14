import { endOfISOWeek } from "datezone";

const timestamp = 1720612800000; // 2024-07-10T12:00:00.000Z
const _end = endOfISOWeek(timestamp, "America/New_York");
// end is 1721015999999 which is 2024-07-15T03:59:59.999Z
