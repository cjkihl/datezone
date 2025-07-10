// @ts-nocheck  – simplified demo code
import { clearFixedOffsetCache } from "datezone";

const result = clearFixedOffsetCache(Date.UTC(2025, 0, 1));
console.log(result);
