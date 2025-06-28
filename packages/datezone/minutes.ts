export function startOfMinute(ts: number): number {
	return ts - (ts % 60000);
}

export function endOfMinute(ts: number): number {
	return ts - (ts % 60000) + 59999;
}

export function addMinutes(ts: number, amount: number): number {
	return ts + amount * 60 * 1000;
}

export function subMinutes(ts: number, amount: number): number {
	return ts - amount * 60 * 1000;
}
