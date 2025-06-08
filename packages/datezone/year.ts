import { formatToParts, type TimeZone } from "./index.pub";


const YEAR_OPTS = { year: "numeric" } as const;
type YearOptions = { year: number };
type OptionsOrTimestamp = YearOptions | number;

function getOptions(ts: OptionsOrTimestamp, timeZone: TimeZone): YearOptions {
	const dt =
		typeof ts === "number" ? formatToParts(ts, timeZone, YEAR_OPTS) : ts;
	return dt;
}


export function getYear(ts: OptionsOrTimestamp, timeZone: TimeZone): number {
	const { year } = getOptions(ts, timeZone);
	return year ?? 0;
}

export function isLeapYear(ts: OptionsOrTimestamp, timeZone: TimeZone): boolean {
	const { year } = getOptions(ts, timeZone);
	return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

export function startOfYear(date: OptionsOrTimestamp, timeZone: TimeZone) {
    // TODO: Implement
}
export function endOfYear(date: OptionsOrTimestamp, timeZone: TimeZone) {
    // TODO: Implement
}
export function addYears(date: OptionsOrTimestamp, amount: number, timeZone: TimeZone) {
    // TODO: Implement
}
export function subYears(date: OptionsOrTimestamp, amount: number, timeZone: TimeZone) {
    // TODO: Implement
}
export function getDaysInYear(date: OptionsOrTimestamp, timeZone: TimeZone) {
    // TODO: Implement
}
