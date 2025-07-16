import type { DSTTimeZone } from "datezone";

const _timezone: DSTTimeZone = "America/New_York";

// @ts-expect-error
const _nonDstTimeZone: DSTTimeZone = "Asia/Tokyo";
