import { addMonths } from "datezone";

const timestamp = 1720612800000; // 2024-07-10T12:00:00.000Z
const _newDate = addMonths(timestamp, 2, "America/New_York");
// newDate is 1725969600000 which is 2024-09-10T12:00:00.000Z
