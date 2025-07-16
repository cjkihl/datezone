import { getFixedOffsetCacheInfo } from "datezone";

const info = getFixedOffsetCacheInfo();

console.log(info); // { size: 0, cachedTimezones: [] }
