export function startOfSecond(ts: number): number {
	return ts - (ts % 1000);
}

export function endOfSecond(ts: number): number {
	return ts - (ts % 1000) + 999;
}

export function addSeconds(ts: number, amount: number): number {
	return ts + amount * 1000;
}

export function subSeconds(ts: number, amount: number): number {
	return ts - amount * 1000;
}

export function addMilliseconds(ts: number, amount: number): number {
	return ts + amount;
}

export function subMilliseconds(ts: number, amount: number): number {
	return ts - amount;
}
