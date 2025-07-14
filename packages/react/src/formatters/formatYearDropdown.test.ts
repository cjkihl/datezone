import { expect, test } from "bun:test";
import { defaultDateLib } from "../utils/testdatelib";
import { formatYearDropdown } from "./formatYearDropdown";

test("should return the formatted weekday name", () => {
	expect(formatYearDropdown(new Date(2022, 0), defaultDateLib)).toEqual("2022");
});
