// @ts-nocheck  – simplified demo code
import { getFixedOffsetCacheInfo } from "datezone";

const result = getFixedOffsetCacheInfo(Date.UTC(2025, 0, 1));
console.log(result);
