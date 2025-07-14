import { describe, expect, test } from "bun:test";
import { defaultDateLib } from "../utils/testdatelib";
import { getBroadcastWeeksInMonth } from "./getBroadcastWeeksInMonth";

describe("getBroadcastWeeksInMonth", () => {
	type Weeks = 4 | 5;
	const cases: { month: Date; expectedWeeks: Weeks }[] = [
		{ expectedWeeks: 5, month: new Date(2023, 0, 1) },
		{ expectedWeeks: 4, month: new Date(2023, 1, 1) },
		{ expectedWeeks: 4, month: new Date(2023, 2, 1) },
		{ expectedWeeks: 5, month: new Date(2023, 3, 1) },
		{ expectedWeeks: 4, month: new Date(2023, 4, 1) },
		{ expectedWeeks: 4, month: new Date(2023, 5, 1) },
		{ expectedWeeks: 5, month: new Date(2023, 6, 1) },
		{ expectedWeeks: 4, month: new Date(2023, 7, 1) },
		{ expectedWeeks: 4, month: new Date(2023, 8, 1) },
		{ expectedWeeks: 5, month: new Date(2023, 9, 1) },
		{ expectedWeeks: 4, month: new Date(2023, 10, 1) },
		{ expectedWeeks: 5, month: new Date(2023, 11, 1) },
	];

	cases.forEach(({ month, expectedWeeks }) => {
		test(`returns ${expectedWeeks} weeks for ${month.toLocaleString("en-US", { month: "long" })}`, () => {
			expect(getBroadcastWeeksInMonth(month, defaultDateLib)).toBe(
				expectedWeeks,
			);
		});
	});
});
