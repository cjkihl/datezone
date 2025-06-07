export const dtfCache = new Map<string, Map<string, Intl.DateTimeFormat>>();

export function getOptionsKey(opts: Intl.DateTimeFormatOptions) {
	// remove timeZone, sort remaining keys
	const { timeZone: _, ...rest } = opts;
	const ks = Object.keys(rest).sort() as Array<keyof typeof rest>;
	return ks.map((k) => `${k}:${rest[k]}`).join("|");
}

export function getCachedFormatter(
	timeZone: string,
	opts: Intl.DateTimeFormatOptions,
): Intl.DateTimeFormat {
	let zoneMap = dtfCache.get(timeZone);
	if (!zoneMap) {
		zoneMap = new Map();
		dtfCache.set(timeZone, zoneMap);
	}

	const key = getOptionsKey(opts);
	let fmt = zoneMap.get(key);
	if (!fmt) {
		fmt = new Intl.DateTimeFormat("en-US", { timeZone, ...opts });
		zoneMap.set(key, fmt);
	}
	return fmt;
}

// Cache for Intl.DateTimeFormat instances per locale and options
const dtfCacheLocale = new Map<string, Map<string, Intl.DateTimeFormat>>();

export function getCachedFormatterLocale(
	locale: string,
	opts: Intl.DateTimeFormatOptions,
): Intl.DateTimeFormat {
	const key = JSON.stringify(opts);
	let localeMap = dtfCacheLocale.get(locale);
	if (!localeMap) {
		localeMap = new Map();
		dtfCacheLocale.set(locale, localeMap);
	}
	let fmt = localeMap.get(key);
	if (!fmt) {
		fmt = new Intl.DateTimeFormat(locale, opts);
		localeMap.set(key, fmt);
	}
	return fmt;
}
