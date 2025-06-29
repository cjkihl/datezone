// Datezone: Just works™
import { addDays } from "datezone";

const date = Date.now();
const _result = addDays(date, 5, "America/New_York"); // That's it!
