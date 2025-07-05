import { TZDate } from "@date-fns/tz";
import { startOfDay } from "date-fns";

// Need to create a TZDate object to use the timeZone (1.2 kB) Footprint
const tzDate = TZDate.tz("Asia/Singapore");

// Start of day, not explicit since timeZone is a hidden parameter of the TZDate object
startOfDay(tzDate).getTime();
