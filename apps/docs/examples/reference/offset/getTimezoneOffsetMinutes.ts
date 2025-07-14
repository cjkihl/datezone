import { getTimezoneOffsetMinutes } from "datezone";

const timestamp = 1720612800000; // 2024-07-10T12:00:00.000Z
const _offset = getTimezoneOffsetMinutes(
	timestamp,
	"America/New_York",
	"Asia/Tokyo",
);
// offset is 780
