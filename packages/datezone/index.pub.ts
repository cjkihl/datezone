import type { TimeZone } from "./timezone.pub.js";

export * from "./cache.js";
export * from "./calendar.pub.js";
export * from "./compare.pub.js";
export * from "./constants.pub.js";
export * from "./day.pub.js";
export * from "./duration.pub.js";
export * from "./format/index.pub.js";
export * from "./format-parts.pub.js";
export * from "./hour.pub.js";
export * from "./iso.pub.js";
export * from "./minute.pub.js";
export * from "./month.pub.js";
export * from "./offset.pub.js";
export * from "./ordinal.pub.js";
export * from "./second.pub.js";
export * from "./timezone.pub.js";
export * from "./week.pub.js";
export * from "./year.pub.js";

/**
 * Get local timezone.
 *
 * @see https://datezone.dev/docs/reference/index#getLocalTimezone
 */
export const getLocalTimezone = () =>
	Intl.DateTimeFormat().resolvedOptions().timeZone as TimeZone;
