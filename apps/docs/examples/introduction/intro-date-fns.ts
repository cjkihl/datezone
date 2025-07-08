import { TZDate } from "@date-fns/tz";
import { startOfDay } from "date-fns";

const tzDate = new TZDate(Date.now(), "Asia/Singapore");

const nowDate = startOfDay(tzDate);

console.log(nowDate.withTimeZone("America/New_York").toISOString());
