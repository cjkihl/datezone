import { isEqual } from "../../../../../packages/datezone/index.pub.ts";
import type { TimeZone } from "../../../../../packages/datezone/index.pub.ts";

const tz: TimeZone = "UTC";
const ts = Date.UTC(2025, 0, 1);

const result = isEqual(Date.UTC(2025, 0, 1), Date.UTC(2025, 0, 1) + 1000);
console.log(result);
