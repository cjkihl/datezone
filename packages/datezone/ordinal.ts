type OrdinalSuffixes = Record<string, string>;

const ordinalSuffixes: Record<string, OrdinalSuffixes> = {
	en: { one: "st", two: "nd", few: "rd", other: "th" },
	fr: { one: "er", other: "e" },
	// Extend as needed
};

const pluralRulesCache = new Map<string, Intl.PluralRules>();
const numberFormatCache = new Map<string, Intl.NumberFormat>();

function getPluralRules(locale: string): Intl.PluralRules {
	if (!pluralRulesCache.has(locale)) {
		pluralRulesCache.set(
			locale,
			new Intl.PluralRules(locale, { type: "ordinal" }),
		);
	}
	return pluralRulesCache.get(locale)!;
}

function getNumberFormat(locale: string): Intl.NumberFormat {
	if (!numberFormatCache.has(locale)) {
		numberFormatCache.set(locale, new Intl.NumberFormat(locale));
	}
	return numberFormatCache.get(locale)!;
}

function getOrdinalSuffix(locale: string, rule: string): string {
	return ordinalSuffixes[locale]?.[rule] ?? "";
}

export function formatOrdinal(number: number, locale = "en"): string {
	const pr = getPluralRules(locale);
	const nf = getNumberFormat(locale);
	const rule = pr.select(number);
	const suffix = getOrdinalSuffix(locale, rule);
	return `${nf.format(number)}${suffix}`;
}
