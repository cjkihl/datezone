type OrdinalSuffixes = Record<string, string>;

const ordinalSuffixes: Record<string, OrdinalSuffixes> = {
	en: { one: "st", two: "nd", few: "rd", other: "th" },
	fr: { one: "er", other: "e" },
	es: { other: "º" }, // Spanish uses º for ordinals
	de: { other: "." }, // German uses period
	it: { one: "º", other: "º" }, // Italian
	pt: { one: "º", other: "º" }, // Portuguese
	nl: { other: "e" }, // Dutch
	// Languages without suffixes (ru, ja, zh, etc.) are omitted and will return empty string
};

const pluralRulesCache = new Map<string, Intl.PluralRules>();
const numberFormatCache = new Map<string, Intl.NumberFormat>();

function getPluralRules(locale: string): Intl.PluralRules {
	if (!pluralRulesCache.has(locale)) {
		try {
			pluralRulesCache.set(
				locale,
				new Intl.PluralRules(locale, { type: "ordinal" }),
			);
		} catch {
			// Fall back to English for invalid locales
			pluralRulesCache.set(
				locale,
				new Intl.PluralRules("en", { type: "ordinal" }),
			);
		}
	}
	return pluralRulesCache.get(locale)!;
}

function getNumberFormat(locale: string): Intl.NumberFormat {
	if (!numberFormatCache.has(locale)) {
		try {
			// For unsupported locales, use Western numerals
			const numberingSystem = ["ar", "fa", "ur"].includes(locale) ? "latn" : undefined;
			numberFormatCache.set(locale, new Intl.NumberFormat(locale, { numberingSystem }));
		} catch {
			// Fall back to English for invalid locales
			numberFormatCache.set(locale, new Intl.NumberFormat("en"));
		}
	}
	return numberFormatCache.get(locale)!;
}

function getOrdinalSuffix(locale: string, rule: string): string {
	// Try exact locale first
	if (ordinalSuffixes[locale]?.[rule]) {
		return ordinalSuffixes[locale][rule];
	}

	// Try language part of locale (e.g., 'en' from 'en-US')
	const language = locale.split("-")[0];
	if (language && language !== locale && ordinalSuffixes[language]?.[rule]) {
		return ordinalSuffixes[language][rule];
	}

	// Fall back to empty string for unsupported locales
	return "";
}

/**
 * Returns the ordinal suffix for the given number in the given locale. (e.g. 1st, 2nd, 3rd, 4th)
 * @param number - The number to format.
 * @param locale - The locale to use.
 * @returns The ordinal suffix.
 */
export function formatOrdinal(number: number, locale = "en"): string {
	const pr = getPluralRules(locale);
	const nf = getNumberFormat(locale);
	const rule = pr.select(number);
	const suffix = getOrdinalSuffix(locale, rule);
	return `${nf.format(number)}${suffix}`;
}
