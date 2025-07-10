import { endOfNextMonth } from "../../../../../packages/datezone/index.pub.ts";
import type { TimeZone } from "../../../../../packages/datezone/index.pub.ts";

const tz: TimeZone = "UTC";
const ts = Date.UTC(2025, 0, 1);

const result = endOfNextMonth(Date.UTC(2025, 0, 1), tz);
console.log(result);
