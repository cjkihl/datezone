import { getTimezoneOffsetMinutes } from "datezone";

const timestamp = 1720612800000; // 2024-07-10T12:00:00.000Z
const offset = getTimezoneOffsetMinutes(
	timestamp,
	"America/New_York",
	"Asia/Tokyo",
);
console.log(offset); // 780
