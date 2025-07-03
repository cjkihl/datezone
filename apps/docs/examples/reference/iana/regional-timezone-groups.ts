import type { TimeZone } from "datezone";

// Regional timezone groups
const _northAmericaTimezones: TimeZone[] = [
	"America/New_York", // Eastern
	"America/Chicago", // Central
	"America/Denver", // Mountain
	"America/Los_Angeles", // Pacific
	"America/Anchorage", // Alaska
	"Pacific/Honolulu", // Hawaii
	"America/Toronto", // Eastern (Canada)
	"America/Vancouver", // Pacific (Canada)
];

const _europeTimezones: TimeZone[] = [
	"Europe/London", // GMT/BST
	"Europe/Paris", // CET/CEST
	"Europe/Berlin", // CET/CEST
	"Europe/Rome", // CET/CEST
	"Europe/Madrid", // CET/CEST
	"Europe/Amsterdam", // CET/CEST
	"Europe/Stockholm", // CET/CEST
	"Europe/Moscow", // MSK
];

const _asiaTimezones: TimeZone[] = [
	"Asia/Tokyo", // JST
	"Asia/Shanghai", // CST
	"Asia/Hong_Kong", // HKT
	"Asia/Singapore", // SGT
	"Asia/Seoul", // KST
	"Asia/Kolkata", // IST
	"Asia/Dubai", // GST
	"Asia/Bangkok", // ICT
];

const _oceaniaTimezones: TimeZone[] = [
	"Australia/Sydney", // AEST/AEDT
	"Australia/Melbourne", // AEST/AEDT
	"Australia/Perth", // AWST
	"Pacific/Auckland", // NZST/NZDT
	"Pacific/Fiji", // FJT
];
