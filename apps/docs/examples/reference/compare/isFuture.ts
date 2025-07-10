import { isFuture } from "../../../../../packages/datezone/index.pub.ts";
import type { TimeZone } from "../../../../../packages/datezone/index.pub.ts";

const tz: TimeZone = "UTC";
const ts = Date.UTC(2025, 0, 1);

const result = isFuture(Date.UTC(2025, 0, 1));
console.log(result);
