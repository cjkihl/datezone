import { defaultDateLib } from "../classes/DateLib";
import * as formatters from "../formatters/index.js";

import { getMonthOptions } from "./getMonthOptions";

describe("return correct dropdown options", () => {
	test("when navStart and navEnd are defined", () => {
		const displayMonth = new Date(2022, 0, 1);
		const startMonth = new Date(2022, 0, 1);
		const endMonth = new Date(2022, 11, 31);
		const result = getMonthOptions(
			displayMonth,
			startMonth,
			endMonth,
			formatters,
			defaultDateLib,
		);

		expect(result).toEqual([
			{ disabled: false, label: "January", value: 0 },
			{ disabled: false, label: "February", value: 1 },
			{ disabled: false, label: "March", value: 2 },
			{ disabled: false, label: "April", value: 3 },
			{ disabled: false, label: "May", value: 4 },
			{ disabled: false, label: "June", value: 5 },
			{ disabled: false, label: "July", value: 6 },
			{ disabled: false, label: "August", value: 7 },
			{ disabled: false, label: "September", value: 8 },
			{ disabled: false, label: "October", value: 9 },
			{ disabled: false, label: "November", value: 10 },
			{ disabled: false, label: "December", value: 11 },
		]);
	});

	test("when navStart and navEnd are undefined", () => {
		const displayMonth = new Date(2022, 0, 1);
		const result = getMonthOptions(
			displayMonth,
			undefined,
			undefined,
			formatters,
			defaultDateLib,
		);

		expect(result).toEqual([
			{ disabled: false, label: "January", value: 0 },
			{ disabled: false, label: "February", value: 1 },
			{ disabled: false, label: "March", value: 2 },
			{ disabled: false, label: "April", value: 3 },
			{ disabled: false, label: "May", value: 4 },
			{ disabled: false, label: "June", value: 5 },
			{ disabled: false, label: "July", value: 6 },
			{ disabled: false, label: "August", value: 7 },
			{ disabled: false, label: "September", value: 8 },
			{ disabled: false, label: "October", value: 9 },
			{ disabled: false, label: "November", value: 10 },
			{ disabled: false, label: "December", value: 11 },
		]);
	});

	test("when less than 12 months between start and end month", () => {
		const displayMonth = new Date(2024, 9);
		const startMonth = new Date(2024, 9);
		const endMonth = new Date(2025, 5);
		const result = getMonthOptions(
			displayMonth,
			startMonth,
			endMonth,
			formatters,
			defaultDateLib,
		);

		expect(result).toEqual([
			{ disabled: true, label: "January", value: 0 },
			{ disabled: true, label: "February", value: 1 },
			{ disabled: true, label: "March", value: 2 },
			{ disabled: true, label: "April", value: 3 },
			{ disabled: true, label: "May", value: 4 },
			{ disabled: true, label: "June", value: 5 },
			{ disabled: true, label: "July", value: 6 },
			{ disabled: true, label: "August", value: 7 },
			{ disabled: true, label: "September", value: 8 },
			{ disabled: false, label: "October", value: 9 },
			{ disabled: false, label: "November", value: 10 },
			{ disabled: false, label: "December", value: 11 },
		]);
	});

	test("return undefined when navStart is undefined", () => {
		const displayMonth = new Date(2022, 0, 1);
		const endMonth = new Date(2022, 6, 31);
		const result = getMonthOptions(
			displayMonth,
			undefined,
			endMonth,
			formatters,
			defaultDateLib,
		);

		expect(result).toEqual([
			{ disabled: false, label: "January", value: 0 },
			{ disabled: false, label: "February", value: 1 },
			{ disabled: false, label: "March", value: 2 },
			{ disabled: false, label: "April", value: 3 },
			{ disabled: false, label: "May", value: 4 },
			{ disabled: false, label: "June", value: 5 },
			{ disabled: false, label: "July", value: 6 },
			{ disabled: true, label: "August", value: 7 },
			{ disabled: true, label: "September", value: 8 },
			{ disabled: true, label: "October", value: 9 },
			{ disabled: true, label: "November", value: 10 },
			{ disabled: true, label: "December", value: 11 },
		]);
	});

	test("return undefined when navEnd is undefined", () => {
		const displayMonth = new Date(2022, 6, 1);
		const startMonth = new Date(2022, 3, 1);
		const result = getMonthOptions(
			displayMonth,
			startMonth,
			undefined,
			formatters,
			defaultDateLib,
		);

		expect(result).toEqual([
			{ disabled: true, label: "January", value: 0 },
			{ disabled: true, label: "February", value: 1 },
			{ disabled: true, label: "March", value: 2 },
			{ disabled: false, label: "April", value: 3 },
			{ disabled: false, label: "May", value: 4 },
			{ disabled: false, label: "June", value: 5 },
			{ disabled: false, label: "July", value: 6 },
			{ disabled: false, label: "August", value: 7 },
			{ disabled: false, label: "September", value: 8 },
			{ disabled: false, label: "October", value: 9 },
			{ disabled: false, label: "November", value: 10 },
			{ disabled: false, label: "December", value: 11 },
		]);
	});

	test("when navStart is after displayMonth", () => {
		const displayMonth = new Date(2022, 0, 1);
		const startMonth = new Date(2022, 2, 1);
		const endMonth = new Date(2022, 11, 31);
		const result = getMonthOptions(
			displayMonth,
			startMonth,
			endMonth,
			formatters,
			defaultDateLib,
		);

		expect(result).toEqual([
			{ disabled: true, label: "January", value: 0 },
			{ disabled: true, label: "February", value: 1 },
			{ disabled: false, label: "March", value: 2 },
			{ disabled: false, label: "April", value: 3 },
			{ disabled: false, label: "May", value: 4 },
			{ disabled: false, label: "June", value: 5 },
			{ disabled: false, label: "July", value: 6 },
			{ disabled: false, label: "August", value: 7 },
			{ disabled: false, label: "September", value: 8 },
			{ disabled: false, label: "October", value: 9 },
			{ disabled: false, label: "November", value: 10 },
			{ disabled: false, label: "December", value: 11 },
		]);
	});

	test("when navEnd is before displayMonth", () => {
		const displayMonth = new Date(2022, 6, 1);
		const startMonth = new Date(2022, 0, 1);
		const endMonth = new Date(2022, 5, 30);
		const result = getMonthOptions(
			displayMonth,
			startMonth,
			endMonth,
			formatters,
			defaultDateLib,
		);

		expect(result).toEqual([
			{ disabled: false, label: "January", value: 0 },
			{ disabled: false, label: "February", value: 1 },
			{ disabled: false, label: "March", value: 2 },
			{ disabled: false, label: "April", value: 3 },
			{ disabled: false, label: "May", value: 4 },
			{ disabled: false, label: "June", value: 5 },
			{ disabled: true, label: "July", value: 6 },
			{ disabled: true, label: "August", value: 7 },
			{ disabled: true, label: "September", value: 8 },
			{ disabled: true, label: "October", value: 9 },
			{ disabled: true, label: "November", value: 10 },
			{ disabled: true, label: "December", value: 11 },
		]);
	});

	test("when navStart and navEnd are within the same year", () => {
		const displayMonth = new Date(2022, 0, 1);
		const startMonth = new Date(2022, 2, 1);
		const endMonth = new Date(2022, 8, 30);
		const result = getMonthOptions(
			displayMonth,
			startMonth,
			endMonth,
			formatters,
			defaultDateLib,
		);

		expect(result).toEqual([
			{ disabled: true, label: "January", value: 0 },
			{ disabled: true, label: "February", value: 1 },
			{ disabled: false, label: "March", value: 2 },
			{ disabled: false, label: "April", value: 3 },
			{ disabled: false, label: "May", value: 4 },
			{ disabled: false, label: "June", value: 5 },
			{ disabled: false, label: "July", value: 6 },
			{ disabled: false, label: "August", value: 7 },
			{ disabled: false, label: "September", value: 8 },
			{ disabled: true, label: "October", value: 9 },
			{ disabled: true, label: "November", value: 10 },
			{ disabled: true, label: "December", value: 11 },
		]);
	});
});
