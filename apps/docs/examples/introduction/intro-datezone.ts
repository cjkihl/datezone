import { startOfDay, toISOString } from "datezone";

const now = startOfDay(Date.now(), "Asia/Singapore");

console.log(toISOString(now, "America/New_York"));
