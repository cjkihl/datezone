import type { TimeZone } from "datezone";
import { isFuture } from "datezone";

const tz: TimeZone = "UTC";
const ts = Date.UTC(2025, 0, 1);

const result = isFuture(Date.UTC(2025, 0, 1));
console.log(result);
