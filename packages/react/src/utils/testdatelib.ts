import { DateLib } from "../classes";

export const defaultDateLib = new DateLib({
	locale: "en-US",
	numerals: "latn",
	timeZone: "UTC",
});
