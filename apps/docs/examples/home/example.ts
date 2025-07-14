import { addDays, startOfDay } from "datezone";

const now = Date.now();
const _start = startOfDay(now, "America/New_York");
const _tomorrow = addDays(now, 1, "Europe/London");
