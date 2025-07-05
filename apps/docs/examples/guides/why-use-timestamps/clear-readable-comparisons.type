import { isAfter, isSameDay } from "datezone";

const timestamp1 = Date.now();
const timestamp2 = Date.now() + 24 * 60 * 60 * 1000;

// Clear, readable comparisons
const _sameDay = isSameDay(timestamp1, timestamp2, "America/New_York");
const _isLater = isAfter(timestamp2, timestamp1);
