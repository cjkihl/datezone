import { renderHook } from "@testing-library/react";
import type React from "react";
import type { CalendarDay } from "./classes/CalendarDay";
import { CalendarMonth } from "./classes/CalendarMonth";
import type { DayPickerProps } from "./types/props";
import type { Modifiers } from "./types/shared";
import { Animation, DayFlag, SelectionState, UI } from "./UI";
import {
	type DayPickerContext,
	dayPickerContext,
	useDayPicker,
} from "./useDayPicker";

describe("useDayPicker", () => {
	const mockContextValue: DayPickerContext<{
		required: false;
		mode: "single";
	}> = {
		classNames: {
			[UI.Root]: "",
			[UI.Chevron]: "",
			[UI.Day]: "",
			[UI.DayButton]: "",
			[UI.CaptionLabel]: "",
			[UI.Dropdowns]: "",
			[UI.Dropdown]: "",
			[UI.DropdownRoot]: "",
			[UI.Footer]: "",
			[UI.MonthGrid]: "",
			[UI.MonthCaption]: "",
			[UI.MonthsDropdown]: "",
			[UI.Month]: "",
			[UI.Months]: "",
			[UI.Nav]: "",
			[UI.NextMonthButton]: "",
			[UI.PreviousMonthButton]: "",
			[UI.Week]: "",
			[UI.Weeks]: "",
			[UI.Weekday]: "",
			[UI.Weekdays]: "",
			[UI.WeekNumber]: "",
			[UI.WeekNumberHeader]: "",
			[UI.YearsDropdown]: "",
			[SelectionState.range_end]: "",
			[SelectionState.range_middle]: "",
			[SelectionState.range_start]: "",
			[SelectionState.selected]: "",
			[DayFlag.disabled]: "",
			[DayFlag.hidden]: "",
			[DayFlag.outside]: "",
			[DayFlag.focused]: "",
			[DayFlag.today]: "",
			[Animation.weeks_after_enter]: "",
			[Animation.weeks_before_exit]: "",
			[Animation.weeks_before_enter]: "",
			[Animation.weeks_after_exit]: "",
			[Animation.caption_after_enter]: "",
			[Animation.caption_before_exit]: "",
			[Animation.caption_before_enter]: "",
			[Animation.caption_after_exit]: "",
		},
		components: {
			Button: jest.fn(),
			CaptionLabel: jest.fn(),
			Chevron: jest.fn(),
			Day: jest.fn(),
			DayButton: jest.fn(),
			Dropdown: jest.fn(),
			DropdownNav: jest.fn(),
			Footer: jest.fn(),
			Month: jest.fn(),
			MonthCaption: jest.fn(),
			MonthGrid: jest.fn(),
			Months: jest.fn(),
			MonthsDropdown: jest.fn(),
			Nav: jest.fn(),
			NextMonthButton: jest.fn(),
			Option: jest.fn(),
			PreviousMonthButton: jest.fn(),
			Root: jest.fn(),
			Select: jest.fn(),
			Week: jest.fn(),
			Weekday: jest.fn(),
			Weekdays: jest.fn(),
			WeekNumber: jest.fn(),
			WeekNumberHeader: jest.fn(),
			Weeks: jest.fn(),
			YearsDropdown: jest.fn(),
		},
		dayPickerProps: {
			mode: "single",
			required: false,
		} as DayPickerProps,
		formatters: {
			formatCaption: jest.fn(),
			formatDay: jest.fn(),
			formatMonthCaption: jest.fn(),
			formatMonthDropdown: jest.fn(),
			formatWeekdayName: jest.fn(),
			formatWeekNumber: jest.fn(),
			formatWeekNumberHeader: jest.fn(),
			formatYearCaption: jest.fn(),
			formatYearDropdown: jest.fn(),
		},
		getModifiers: jest.fn((_day: CalendarDay) => ({}) as Modifiers),
		goToMonth: jest.fn(),
		isSelected: jest.fn((_date: Date) => false),
		labels: {
			labelDay: jest.fn(),
			labelDayButton: jest.fn(),
			labelGrid: jest.fn(),
			labelGridcell: jest.fn(),
			labelMonthDropdown: jest.fn(),
			labelNav: jest.fn(),
			labelNext: jest.fn(),
			labelPrevious: jest.fn(),
			labelWeekday: jest.fn(),
			labelWeekNumber: jest.fn(),
			labelWeekNumberHeader: jest.fn(),
			labelYearDropdown: jest.fn(),
		},
		months: [new CalendarMonth(new Date(), [])],
		nextMonth: new Date(),
		previousMonth: new Date(),
		select: jest.fn(),
		selected: undefined,
		styles: {},
	};

	it("should return the context value when used within a DayPicker provider", () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<dayPickerContext.Provider value={mockContextValue}>
				{children}
			</dayPickerContext.Provider>
		);

		const { result } = renderHook(() => useDayPicker(), { wrapper });
		expect(result.current).toEqual(mockContextValue);
	});
});
