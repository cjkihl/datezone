import { addDays, startOfDay } from "datezone";

const now = Date.now();
const start = startOfDay(now, "America/New_York");
const tomorrow = addDays(now, 1, "Europe/London");
