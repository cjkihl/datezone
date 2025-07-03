import { endOfDay, startOfDay } from "datezone";

const timestamp = Date.now();

// Always returns the correct start/end of day, regardless of DST
const _dayStart = startOfDay(timestamp, "America/New_York");
const _dayEnd = endOfDay(timestamp, "America/New_York");

// Works correctly even during DST transitions
