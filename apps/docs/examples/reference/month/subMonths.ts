import { subMonths } from "datezone";

const timestamp = 1720612800000; // 2024-07-10T12:00:00.000Z
const _newDate = subMonths(timestamp, 2, "America/New_York");
// newDate is 1715342400000 which is 2024-05-10T12:00:00.000Z
