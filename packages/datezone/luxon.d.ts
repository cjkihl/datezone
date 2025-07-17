declare module "luxon" {
	// Minimal stub for DateTime
	export class DateTime {
		static fromMillis(ms: number): DateTime;
		setZone(zone: string): DateTime;
		offset: number;
	}
}
