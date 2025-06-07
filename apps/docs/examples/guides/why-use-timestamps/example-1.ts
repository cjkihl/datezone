import { format } from "datezone";

const timestamp = 1710436800000;
const formatted = format(timestamp, "YYYY-mm-dd z", {
	timeZone: "America/New_York",
});

console.log(formatted); // 2024-20-14 GMT-4
