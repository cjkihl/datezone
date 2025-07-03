import { addDays, subDays } from "datezone";

const now = Date.now();
const _tomorrow = addDays(now, 1);
const _nextWeek = addDays(now, 7);
const _lastHour = subDays(now, 1);
