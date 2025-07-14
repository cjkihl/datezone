import { expect, test } from "bun:test";
import { defaultDateLib } from "../utils/testdatelib";

import { getFormatters } from "./getFormatters";
import { getYearOptions } from "./getYearOptions";

test("return undefined if navStart or navEnd are not set", () => {
	const formatters = getFormatters({
		formatYearDropdown: (date: Date) => `${date.getFullYear()}`,
	});
	const result1 = getYearOptions(
		undefined,
		new Date(2022, 11, 31),
		formatters,
		defaultDateLib,
	);
	const result2 = getYearOptions(
		new Date(2022, 0, 1),
		undefined,
		formatters,
		defaultDateLib,
	);

	expect(result1).toBeUndefined();
	expect(result2).toBeUndefined();
});

test("return correct dropdown options", () => {
	const startMonth = new Date(2022, 0, 1); // January 2022
	const endMonth = new Date(2024, 11, 31); // December 2024
	const formatters = getFormatters({
		formatYearDropdown: (date: Date) => `${date.getFullYear()}`,
	});

	const result = getYearOptions(
		startMonth,
		endMonth,
		formatters,
		defaultDateLib,
	);

	expect(result).toEqual([
		{ disabled: false, label: "2022", value: 2022 },
		{ disabled: false, label: "2023", value: 2023 },
		{ disabled: false, label: "2024", value: 2024 },
	]);
});
