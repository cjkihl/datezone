import type { TimeZone } from "./timezone.pub.js";

export * from "./cache.js";
export * from "./compare.pub.js";
export * from "./constants.pub.js";
export * from "./day.pub.js";
export * from "./format/index.js";
export * from "./hour.pub.js";
export * from "./minute.pub.js";
export * from "./month.pub.js";
export * from "./offset.pub.js";
export * from "./ordinal.pub.js";
export * from "./second.pub.js";
export * from "./timezone.pub.js";
export * from "./walltime.pub.js";
export * from "./week.pub.js";
export * from "./year.pub.js";

/**
 * Get the current local timezone,
 * This is the timezone of the browser or the server.
 */
export const getLocalTimezone = () =>
	Intl.DateTimeFormat().resolvedOptions().timeZone as TimeZone;
