import { addDays, format } from "datezone";

const date = new Date("2024-06-01T12:00:00Z").getTime();
const tomorrow = addDays(date, 1);

console.log(
	"Original:",
	format(date, "yyyy-MM-dd", { locale: "en-US", timeZone: "UTC" }),
);
console.log(
	"Tomorrow:",
	format(tomorrow, "yyyy-MM-dd", { locale: "en-US", timeZone: "UTC" }),
);
