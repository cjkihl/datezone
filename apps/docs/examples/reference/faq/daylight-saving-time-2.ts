import { daylight-saving-time-2 } from "../../../../../packages/datezone/index.pub.ts";
import type { TimeZone } from "../../../../../packages/datezone/index.pub.ts";

const tz: TimeZone = "UTC";
const ts = Date.UTC(2025, 0, 1);

const result = daylight-saving-time-2(Date.UTC(2025, 0, 1), tz);
console.log(result);
