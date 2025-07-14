import { beforeEach, describe, expect, test } from "bun:test";
import { defaultDateLib } from "../utils/testdatelib";
import { getWeekdays } from "./getWeekdays";

let result: Date[];

describe("when rendered without a locale", () => {
	beforeEach(() => {
		result = getWeekdays(defaultDateLib);
	});
	test("should return 7 days", () => {
		expect(result).toHaveLength(7);
	});
	test("should return Sunday as first day", () => {
		expect(result[0].getDay()).toBe(0);
	});
});

describe("when using ISO week", () => {
	beforeEach(() => {
		result = getWeekdays(defaultDateLib, true, undefined);
	});
	test("should return Monday as first day", () => {
		expect(result[0].getDay()).toBe(1);
	});
});
