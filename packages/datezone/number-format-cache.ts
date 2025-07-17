/**
 * Cache for Intl.NumberFormat instances to avoid repeated creation
 */
const numberFormatCache = new Map<string, Intl.NumberFormat>();

/**
 * Generate a cache key from locale and options
 */
function generateCacheKey(
	locale: string,
	options?: Intl.NumberFormatOptions,
): string {
	if (!options || Object.keys(options).length === 0) {
		return locale;
	}

	// Sort keys for consistent cache keys
	const sortedEntries = Object.entries(options)
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([key, value]) => `${key}:${value}`)
		.join("|");

	return `${locale}|${sortedEntries}`;
}

/**
 * Get a cached NumberFormat instance or create a new one
 * @param locale The locale for formatting
 * @param options NumberFormat options
 * @param fallbackLocale Fallback locale if the primary locale fails (defaults to 'en')
 * @returns Cached Intl.NumberFormat instance
 */
export function getCachedNumberFormat(
	locale: string,
	options?: Intl.NumberFormatOptions,
	fallbackLocale = "en",
): Intl.NumberFormat {
	const key = generateCacheKey(locale, options);
	let formatter = numberFormatCache.get(key);

	if (!formatter) {
		try {
			formatter = new Intl.NumberFormat(locale, options);
		} catch {
			// Fall back to fallback locale for invalid locales
			const fallbackKey = generateCacheKey(fallbackLocale, options);
			formatter = numberFormatCache.get(fallbackKey);

			if (!formatter) {
				formatter = new Intl.NumberFormat(fallbackLocale, options);
				numberFormatCache.set(fallbackKey, formatter);
			}
		}

		numberFormatCache.set(key, formatter);
	}

	return formatter;
}

/**
 * Clear the NumberFormat cache (useful for testing or memory management)
 */
export function clearNumberFormatCache(): void {
	numberFormatCache.clear();
}

/**
 * Get cache information for debugging
 */
export function getNumberFormatCacheInfo(): { size: number; keys: string[] } {
	return {
		keys: Array.from(numberFormatCache.keys()),
		size: numberFormatCache.size,
	};
}
