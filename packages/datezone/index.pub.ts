import type { TimeZone } from "./timezone.js";

export * from "./cache.js";
export * from "./compare.js";
export * from "./constants.js";
export * from "./day.js";
export * from "./format/index.js";
export * from "./format-parts.js";
export * from "./hour.js";
export * from "./minute.js";
export * from "./month.js";
export * from "./offset.js";
export * from "./ordinal.js";
export * from "./second.js";
export * from "./timezone.js";
export * from "./utils.js";
export * from "./week.js";
export * from "./year.js";

/**
 * Get the current local timezone,
 * This is the timezone of the browser or the server.
 */
export const getLocalTimezone = () =>
	Intl.DateTimeFormat().resolvedOptions().timeZone as TimeZone;
