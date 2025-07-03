const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const now = Date.now();
const _inOneHour = now + HOUR;
const _yesterday = now - DAY;
