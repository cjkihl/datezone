import { previousDay, type TimeZone, toISOString } from "datezone";

const tz: TimeZone = "America/Sao_Paulo";
const now = Date.now();

const yesterday = previousDay(now, tz);

console.log(`Yesterday in ${tz}: ${toISOString(yesterday, tz)}`);
