import { subDays } from "datezone";

const now = Date.now();
const result = subDays(now, 2, "Europe/London");

console.log("Original:", new Date(now).toISOString());
console.log(
	"Subtract 2 days (London timezone):",
	new Date(result).toISOString(),
);
