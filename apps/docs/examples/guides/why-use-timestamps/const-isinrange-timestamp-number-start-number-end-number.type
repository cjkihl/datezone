const isInRange = (timestamp: number, start: number, end: number) => {
	return timestamp >= start && timestamp <= end;
};

const start = Date.now();
const end = start + 7 * 24 * 60 * 60 * 1000; // 7 days later
const check = Date.now() + 3 * 24 * 60 * 60 * 1000; // 3 days later

console.log(isInRange(check, start, end)); // true
