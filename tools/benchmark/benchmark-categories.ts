// Shared benchmark group/category definitions and categorization logic

export const BENCHMARK_GROUPS = {
	COMPLEX_TIMEZONE: "Complex Timezone",
	DATEZONE_SPECIFIC: "Datezone-Specific",
	MULTI_TIMEZONE: "Multi-Timezone",
	NON_TIMEZONE_DAY: "Non-Timezone: Day",
	NON_TIMEZONE_MONTH: "Non-Timezone: Month",
	NON_TIMEZONE_YEAR: "Non-Timezone: Year",
	REAL_WORLD: "Real-World",
	TIMEZONE_AWARE_DAY: "Timezone-Aware: Day",
	TIMEZONE_AWARE_FORMATTING: "Timezone-Aware: Formatting",
	TIMEZONE_AWARE_MONTH: "Timezone-Aware: Month",
	TIMEZONE_AWARE_YEAR: "Timezone-Aware: Year",
} as const;

export type BenchmarkGroupKey = keyof typeof BENCHMARK_GROUPS;

export const GROUP_LABELS: Record<BenchmarkGroupKey, string> = {
	COMPLEX_TIMEZONE: "Complex Timezone Workflows",
	DATEZONE_SPECIFIC: "Datezone-Specific Operations",
	MULTI_TIMEZONE: "Multi-Timezone Operations",
	NON_TIMEZONE_DAY: "Non-Timezone: Day Operations",
	NON_TIMEZONE_MONTH: "Non-Timezone: Month Operations",
	NON_TIMEZONE_YEAR: "Non-Timezone: Year Operations",
	REAL_WORLD: "Real-World Timezone Scenarios",
	TIMEZONE_AWARE_DAY: "Timezone-Aware: Day Operations",
	TIMEZONE_AWARE_FORMATTING: "Timezone-Aware: Formatting Operations",
	TIMEZONE_AWARE_MONTH: "Timezone-Aware: Month Operations",
	TIMEZONE_AWARE_YEAR: "Timezone-Aware: Year Operations",
};

// Shared categorize function: returns the group key (not display name)
export function categorize(operation: string): BenchmarkGroupKey | "Other" {
	const op = operation.toLowerCase();
	if (op.includes("timezone") && op.includes("month"))
		return "TIMEZONE_AWARE_MONTH";
	if (op.includes("timezone") && op.includes("day"))
		return "TIMEZONE_AWARE_DAY";
	if (op.includes("timezone") && op.includes("year"))
		return "TIMEZONE_AWARE_YEAR";
	if (op.includes("timezone") && op.includes("format"))
		return "TIMEZONE_AWARE_FORMATTING";
	if (!op.includes("timezone") && op.includes("month"))
		return "NON_TIMEZONE_MONTH";
	if (!op.includes("timezone") && op.includes("day")) return "NON_TIMEZONE_DAY";
	if (!op.includes("timezone") && op.includes("year"))
		return "NON_TIMEZONE_YEAR";
	if (op.includes("complex")) return "COMPLEX_TIMEZONE";
	if (op.includes("multi") && op.includes("timezone")) return "MULTI_TIMEZONE";
	if (
		op.includes("real-world") ||
		op.includes("calendar") ||
		op.includes("dashboard")
	)
		return "REAL_WORLD";
	if (
		op.includes("datezone") ||
		op.includes("offset") ||
		op.includes("walltime")
	)
		return "DATEZONE_SPECIFIC";
	return "Other";
}
