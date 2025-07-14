import { TZDate } from "@date-fns/tz";
import type { ChangeEvent, FocusEvent, KeyboardEvent, MouseEvent } from "react";
import { useCallback, useMemo, useRef } from "react";
import type { CalendarDay } from "./classes/CalendarDay.js";
import { DateLib } from "./classes/DateLib.js";
import { createGetModifiers } from "./helpers/createGetModifiers.js";
import { getClassNamesForModifiers } from "./helpers/getClassNamesForModifiers.js";
import { getComponents } from "./helpers/getComponents.js";
import { getDataAttributes } from "./helpers/getDataAttributes.js";
import { getDefaultClassNames } from "./helpers/getDefaultClassNames.js";
import { getFormatters } from "./helpers/getFormatters.js";
import { getMonthOptions } from "./helpers/getMonthOptions.js";
import { getStyleForModifiers } from "./helpers/getStyleForModifiers.js";
import { getWeekdays } from "./helpers/getWeekdays.js";
import { getYearOptions } from "./helpers/getYearOptions.js";
import * as defaultLabels from "./labels/index.js";
import type {
	DayPickerProps,
	Modifiers,
	MoveFocusBy,
	MoveFocusDir,
	SelectedValue,
	SelectHandler,
} from "./types/index.js";
import { DayFlag, SelectionState, UI } from "./UI.js";
import { useAnimation } from "./useAnimation.js";
import { useCalendar } from "./useCalendar.js";
import { type DayPickerContext, dayPickerContext } from "./useDayPicker.js";
import { useFocus } from "./useFocus.js";
import { useSelection } from "./useSelection.js";
import { rangeIncludesDate } from "./utils/rangeIncludesDate.js";
import { isDateRange } from "./utils/typeguards.js";

/**
 * Renders the DayPicker calendar component.
 *
 * @param initialProps - The props for the DayPicker component.
 * @returns The rendered DayPicker component.
 * @group DayPicker
 * @see https://daypicker.dev
 */
export function DayPicker(initialProps: DayPickerProps) {
	let props = initialProps;

	if (props.timeZone) {
		props = {
			...initialProps,
		};
		if (props.today) {
			props.today = new TZDate(props.today, props.timeZone);
		}
		if (props.month) {
			props.month = new TZDate(props.month, props.timeZone);
		}
		if (props.defaultMonth) {
			props.defaultMonth = new TZDate(props.defaultMonth, props.timeZone);
		}
		if (props.startMonth) {
			props.startMonth = new TZDate(props.startMonth, props.timeZone);
		}
		if (props.endMonth) {
			props.endMonth = new TZDate(props.endMonth, props.timeZone);
		}
		if (props.mode === "single" && props.selected) {
			props.selected = new TZDate(props.selected, props.timeZone);
		} else if (props.mode === "multiple" && props.selected) {
			props.selected = props.selected?.map(
				(date) => new TZDate(date, props.timeZone),
			);
		} else if (props.mode === "range" && props.selected) {
			props.selected = {
				from: props.selected.from
					? new TZDate(props.selected.from, props.timeZone)
					: undefined,
				to: props.selected.to
					? new TZDate(props.selected.to, props.timeZone)
					: undefined,
			};
		}
	}
	const { components, formatters, labels, dateLib, classNames } =
		useMemo(() => {
			const dateLib = new DateLib(
				{
					locale: props.locale,
					numerals: props.numerals,
					timeZone: props.timeZone,
				},
				props.dateLib,
			);

			return {
				classNames: { ...getDefaultClassNames(), ...props.classNames },
				components: getComponents(props.components),
				dateLib,
				formatters: getFormatters(props.formatters),
				labels: { ...defaultLabels, ...props.labels },
			};
		}, [
			props.locale,
			props.timeZone,
			props.numerals,
			props.dateLib,
			props.components,
			props.formatters,
			props.labels,
			props.classNames,
		]);

	const {
		captionLayout,
		mode,
		navLayout,
		numberOfMonths = 1,
		onDayBlur,
		onDayClick,
		onDayFocus,
		onDayKeyDown,
		onDayMouseEnter,
		onDayMouseLeave,
		onNextClick,
		onPrevClick,
		showWeekNumber,
		styles,
	} = props;

	const {
		formatCaption,
		formatDay,
		formatMonthDropdown,
		formatWeekNumber,
		formatWeekNumberHeader,
		formatWeekdayName,
		formatYearDropdown,
	} = formatters;

	const calendar = useCalendar(props, dateLib);

	const {
		days,
		months,
		navStart,
		navEnd,
		previousMonth,
		nextMonth,
		goToMonth,
	} = calendar;

	const getModifiers = createGetModifiers(
		days,
		props,
		navStart,
		navEnd,
		dateLib,
	);

	const {
		isSelected,
		select,
		selected: selectedValue,
	} = useSelection(props, dateLib) ?? {};

	const { blur, focused, isFocusTarget, moveFocus, setFocused } = useFocus(
		props,
		calendar,
		getModifiers,
		isSelected ?? (() => false),
		dateLib,
	);

	const {
		labelDayButton,
		labelGridcell,
		labelGrid,
		labelMonthDropdown,
		labelNav,
		labelPrevious,
		labelNext,
		labelWeekday,
		labelWeekNumber,
		labelWeekNumberHeader,
		labelYearDropdown,
	} = labels;

	const weekdays = useMemo(
		() => getWeekdays(dateLib, props.ISOWeek),
		[dateLib, props.ISOWeek],
	);

	const isInteractive = mode !== undefined || onDayClick !== undefined;

	const handlePreviousClick = useCallback(() => {
		if (!previousMonth) return;
		goToMonth(previousMonth);
		onPrevClick?.(previousMonth);
	}, [previousMonth, goToMonth, onPrevClick]);

	const handleNextClick = useCallback(() => {
		if (!nextMonth) return;
		goToMonth(nextMonth);
		onNextClick?.(nextMonth);
	}, [goToMonth, nextMonth, onNextClick]);

	const handleDayClick = useCallback(
		(day: CalendarDay, m: Modifiers) => (e: MouseEvent) => {
			e.preventDefault();
			e.stopPropagation();
			setFocused(day);
			select?.(day.date, m, e);
			onDayClick?.(day.date, m, e);
		},
		[select, onDayClick, setFocused],
	);

	const handleDayFocus = useCallback(
		(day: CalendarDay, m: Modifiers) => (e: FocusEvent) => {
			setFocused(day);
			onDayFocus?.(day.date, m, e);
		},
		[onDayFocus, setFocused],
	);

	const handleDayBlur = useCallback(
		(day: CalendarDay, m: Modifiers) => (e: FocusEvent) => {
			blur();
			onDayBlur?.(day.date, m, e);
		},
		[blur, onDayBlur],
	);

	const handleDayKeyDown = useCallback(
		(day: CalendarDay, modifiers: Modifiers) => (e: KeyboardEvent) => {
			const keyMap: Record<string, [MoveFocusBy, MoveFocusDir]> = {
				ArrowDown: [e.shiftKey ? "year" : "week", "after"],
				ArrowLeft: [
					e.shiftKey ? "month" : "day",
					props.dir === "rtl" ? "after" : "before",
				],
				ArrowRight: [
					e.shiftKey ? "month" : "day",
					props.dir === "rtl" ? "before" : "after",
				],
				ArrowUp: [e.shiftKey ? "year" : "week", "before"],
				End: ["endOfWeek", "after"],
				Home: ["startOfWeek", "before"],
				PageDown: [e.shiftKey ? "year" : "month", "after"],
				PageUp: [e.shiftKey ? "year" : "month", "before"],
			};
			if (keyMap[e.key]) {
				e.preventDefault();
				e.stopPropagation();
				const [moveBy, moveDir] = keyMap[e.key]!;
				moveFocus(moveBy, moveDir);
			}
			onDayKeyDown?.(day.date, modifiers, e);
		},
		[moveFocus, onDayKeyDown, props.dir],
	);

	const handleDayMouseEnter = useCallback(
		(day: CalendarDay, modifiers: Modifiers) => (e: MouseEvent) => {
			onDayMouseEnter?.(day.date, modifiers, e);
		},
		[onDayMouseEnter],
	);

	const handleDayMouseLeave = useCallback(
		(day: CalendarDay, modifiers: Modifiers) => (e: MouseEvent) => {
			onDayMouseLeave?.(day.date, modifiers, e);
		},
		[onDayMouseLeave],
	);

	const handleMonthChange = useCallback(
		(date: Date) => (e: ChangeEvent<HTMLSelectElement>) => {
			const selectedMonth = Number(e.target.value);
			const month = dateLib.setMonth(dateLib.startOfMonth(date), selectedMonth);
			goToMonth(month);
		},
		[dateLib, goToMonth],
	);

	const handleYearChange = useCallback(
		(date: Date) => (e: ChangeEvent<HTMLSelectElement>) => {
			const selectedYear = Number(e.target.value);
			const month = dateLib.setYear(dateLib.startOfMonth(date), selectedYear);
			goToMonth(month);
		},
		[dateLib, goToMonth],
	);

	const { className, style } = useMemo(
		() => ({
			className: [classNames[UI.Root], props.className]
				.filter(Boolean)
				.join(" "),
			style: { ...styles?.[UI.Root], ...props.style },
		}),
		[classNames, props.className, props.style, styles],
	);

	const dataAttributes = getDataAttributes(props);

	const rootElRef = useRef<HTMLDivElement>(null);
	useAnimation(rootElRef, Boolean(props.animate), {
		classNames,
		dateLib,
		focused,
		months,
	});

	const contextValue: DayPickerContext<DayPickerProps> = {
		classNames,
		components,
		dayPickerProps: props,
		formatters,
		getModifiers,
		goToMonth,
		isSelected,
		labels,
		months,
		nextMonth,
		previousMonth,
		select: select as SelectHandler<DayPickerProps>,
		selected: selectedValue as SelectedValue<DayPickerProps>,
		styles,
	};

	return (
		<dayPickerContext.Provider value={contextValue}>
			<components.Root
				aria-label={props["aria-label"]}
				className={className}
				dir={props.dir}
				id={props.id}
				lang={props.lang}
				nonce={props.nonce}
				role={props.role}
				rootRef={props.animate ? rootElRef : undefined}
				style={style}
				title={props.title}
				{...dataAttributes}
			>
				<components.Months
					className={classNames[UI.Months]}
					style={styles?.[UI.Months]}
				>
					{!props.hideNavigation && !navLayout && (
						<components.Nav
							aria-label={labelNav()}
							className={classNames[UI.Nav]}
							data-animated-nav={props.animate ? "true" : undefined}
							nextMonth={nextMonth}
							onNextClick={handleNextClick}
							onPreviousClick={handlePreviousClick}
							previousMonth={previousMonth}
							style={styles?.[UI.Nav]}
						/>
					)}
					{months.map((calendarMonth, displayIndex) => {
						const dropdownMonths = getMonthOptions(
							calendarMonth.date,
							navStart,
							navEnd,
							formatters,
							dateLib,
						);

						const dropdownYears = getYearOptions(
							navStart,
							navEnd,
							formatters,
							dateLib,
						);
						return (
							<components.Month
								calendarMonth={calendarMonth}
								className={classNames[UI.Month]}
								data-animated-month={props.animate ? "true" : undefined}
								displayIndex={displayIndex}
								key={displayIndex}
								style={styles?.[UI.Month]}
							>
								{navLayout === "around" &&
									!props.hideNavigation &&
									displayIndex === 0 && (
										<components.PreviousMonthButton
											aria-disabled={previousMonth ? undefined : true}
											aria-label={labelPrevious(previousMonth)}
											className={classNames[UI.PreviousMonthButton]}
											data-animated-button={props.animate ? "true" : undefined}
											onClick={handlePreviousClick}
											tabIndex={previousMonth ? undefined : -1}
											type="button"
										>
											<components.Chevron
												className={classNames[UI.Chevron]}
												disabled={previousMonth ? undefined : true}
												orientation={props.dir === "rtl" ? "right" : "left"}
											/>
										</components.PreviousMonthButton>
									)}
								<components.MonthCaption
									calendarMonth={calendarMonth}
									className={classNames[UI.MonthCaption]}
									data-animated-caption={props.animate ? "true" : undefined}
									displayIndex={displayIndex}
									style={styles?.[UI.MonthCaption]}
								>
									{captionLayout?.startsWith("dropdown") ? (
										<components.DropdownNav
											className={classNames[UI.Dropdowns]}
											style={styles?.[UI.Dropdowns]}
										>
											{captionLayout === "dropdown" ||
											captionLayout === "dropdown-months" ? (
												<components.MonthsDropdown
													aria-label={labelMonthDropdown()}
													className={classNames[UI.MonthsDropdown]}
													classNames={classNames}
													components={components}
													disabled={Boolean(props.disableNavigation)}
													onChange={handleMonthChange(calendarMonth.date)}
													options={dropdownMonths}
													style={styles?.[UI.Dropdown]}
													value={dateLib.getMonth(calendarMonth.date)}
												/>
											) : (
												<span>
													{formatMonthDropdown(calendarMonth.date, dateLib)}
												</span>
											)}
											{captionLayout === "dropdown" ||
											captionLayout === "dropdown-years" ? (
												<components.YearsDropdown
													aria-label={labelYearDropdown(dateLib.options)}
													className={classNames[UI.YearsDropdown]}
													classNames={classNames}
													components={components}
													disabled={Boolean(props.disableNavigation)}
													onChange={handleYearChange(calendarMonth.date)}
													options={dropdownYears}
													style={styles?.[UI.Dropdown]}
													value={dateLib.getYear(calendarMonth.date)}
												/>
											) : (
												<span>
													{formatYearDropdown(calendarMonth.date, dateLib)}
												</span>
											)}
											<output
												aria-live="polite"
												style={{
													border: 0,
													clip: "rect(0 0 0 0)",
													height: "1px",
													margin: "-1px",
													overflow: "hidden",
													padding: 0,
													position: "absolute",
													whiteSpace: "nowrap",
													width: "1px",
													wordWrap: "normal",
												}}
											>
												{formatCaption(
													calendarMonth.date,
													dateLib.options,
													dateLib,
												)}
											</output>
										</components.DropdownNav>
									) : (
										// biome-ignore lint/a11y/useSemanticElements: not needed
										<components.CaptionLabel
											aria-live="polite"
											className={classNames[UI.CaptionLabel]}
											role="status"
										>
											{formatCaption(
												calendarMonth.date,
												dateLib.options,
												dateLib,
											)}
										</components.CaptionLabel>
									)}
								</components.MonthCaption>
								{navLayout === "around" &&
									!props.hideNavigation &&
									displayIndex === numberOfMonths - 1 && (
										<components.NextMonthButton
											aria-disabled={nextMonth ? undefined : true}
											aria-label={labelNext(nextMonth)}
											className={classNames[UI.NextMonthButton]}
											data-animated-button={props.animate ? "true" : undefined}
											onClick={handleNextClick}
											tabIndex={nextMonth ? undefined : -1}
											type="button"
										>
											<components.Chevron
												className={classNames[UI.Chevron]}
												disabled={nextMonth ? undefined : true}
												orientation={props.dir === "rtl" ? "left" : "right"}
											/>
										</components.NextMonthButton>
									)}
								{displayIndex === numberOfMonths - 1 &&
									navLayout === "after" &&
									!props.hideNavigation && (
										<components.Nav
											aria-label={labelNav()}
											className={classNames[UI.Nav]}
											data-animated-nav={props.animate ? "true" : undefined}
											nextMonth={nextMonth}
											onNextClick={handleNextClick}
											onPreviousClick={handlePreviousClick}
											previousMonth={previousMonth}
											style={styles?.[UI.Nav]}
										/>
									)}

								{/** biome-ignore lint/a11y/useSemanticElements: not needed */}
								<components.MonthGrid
									aria-label={
										labelGrid(calendarMonth.date, dateLib.options, dateLib) ||
										undefined
									}
									aria-multiselectable={mode === "multiple" || mode === "range"}
									className={classNames[UI.MonthGrid]}
									role="grid"
									style={styles?.[UI.MonthGrid]}
								>
									{!props.hideWeekdays && (
										<components.Weekdays
											className={classNames[UI.Weekdays]}
											data-animated-weekdays={
												props.animate ? "true" : undefined
											}
											style={styles?.[UI.Weekdays]}
										>
											{showWeekNumber && (
												<components.WeekNumberHeader
													aria-label={labelWeekNumberHeader(dateLib.options)}
													className={classNames[UI.WeekNumberHeader]}
													scope="col"
													style={styles?.[UI.WeekNumberHeader]}
												>
													{formatWeekNumberHeader()}
												</components.WeekNumberHeader>
											)}
											{weekdays.map((weekday, i) => (
												<components.Weekday
													aria-label={labelWeekday(
														weekday,
														dateLib.options,
														dateLib,
													)}
													className={classNames[UI.Weekday]}
													key={i}
													scope="col"
													style={styles?.[UI.Weekday]}
												>
													{formatWeekdayName(weekday, dateLib.options, dateLib)}
												</components.Weekday>
											))}
										</components.Weekdays>
									)}
									<components.Weeks
										className={classNames[UI.Weeks]}
										data-animated-weeks={props.animate ? "true" : undefined}
										style={styles?.[UI.Weeks]}
									>
										{calendarMonth.weeks.map((week, _weekIndex) => {
											return (
												<components.Week
													className={classNames[UI.Week]}
													key={week.weekNumber}
													style={styles?.[UI.Week]}
													week={week}
												>
													{showWeekNumber && (
														// biome-ignore lint/a11y/useSemanticElements: not needed
														<components.WeekNumber
															aria-label={labelWeekNumber(week.weekNumber, {
																locale: props.locale,
															})}
															className={classNames[UI.WeekNumber]}
															role="rowheader"
															scope="row"
															style={styles?.[UI.WeekNumber]}
															week={week}
														>
															{formatWeekNumber(week.weekNumber, dateLib)}
														</components.WeekNumber>
													)}
													{week.days.map((day: CalendarDay) => {
														const { date } = day;
														const modifiers = getModifiers(day);

														modifiers[DayFlag.focused] =
															!modifiers.hidden &&
															Boolean(focused?.isEqualTo(day));

														modifiers[SelectionState.selected] =
															isSelected?.(date) || modifiers.selected!;

														if (isDateRange(selectedValue)) {
															// add range modifiers
															const { from, to } = selectedValue;
															modifiers[SelectionState.range_start] = Boolean(
																from && to && dateLib.isSameDay(date, from),
															);
															modifiers[SelectionState.range_end] = Boolean(
																from && to && dateLib.isSameDay(date, to),
															);
															modifiers[SelectionState.range_middle] =
																rangeIncludesDate(
																	selectedValue,
																	date,
																	true,
																	dateLib,
																);
														}

														const style = getStyleForModifiers(
															modifiers,
															styles,
															props.modifiersStyles,
														);

														const className = getClassNamesForModifiers(
															modifiers,
															classNames,
															props.modifiersClassNames,
														);

														const ariaLabel =
															!isInteractive && !modifiers.hidden
																? labelGridcell(
																		date,
																		modifiers,
																		dateLib.options,
																		dateLib,
																	)
																: undefined;

														return (
															// biome-ignore lint/a11y/useSemanticElements: not needed
															<components.Day
																aria-label={ariaLabel}
																aria-selected={modifiers.selected || undefined}
																className={className.join(" ")}
																data-day={dateLib.format(date, "yyyy-MM-dd")}
																data-disabled={modifiers.disabled || undefined}
																data-focused={modifiers.focused || undefined}
																data-hidden={modifiers.hidden || undefined}
																data-month={
																	day.outside
																		? dateLib.format(date, "yyyy-MM")
																		: undefined
																}
																data-outside={day.outside || undefined}
																data-selected={modifiers.selected || undefined}
																data-today={modifiers.today || undefined}
																day={day}
																key={`${dateLib.format(date, "yyyy-MM-dd")}_${dateLib.format(day.displayMonth, "yyyy-MM")}`}
																modifiers={modifiers}
																role="gridcell"
																style={style}
															>
																{!modifiers.hidden && isInteractive ? (
																	<components.DayButton
																		aria-label={labelDayButton(
																			date,
																			modifiers,
																			dateLib.options,
																			dateLib,
																		)}
																		className={classNames[UI.DayButton]}
																		day={day}
																		disabled={modifiers.disabled || undefined}
																		modifiers={modifiers}
																		onBlur={handleDayBlur(day, modifiers)}
																		onClick={handleDayClick(day, modifiers)}
																		onFocus={handleDayFocus(day, modifiers)}
																		onKeyDown={handleDayKeyDown(day, modifiers)}
																		onMouseEnter={handleDayMouseEnter(
																			day,
																			modifiers,
																		)}
																		onMouseLeave={handleDayMouseLeave(
																			day,
																			modifiers,
																		)}
																		style={styles?.[UI.DayButton]}
																		tabIndex={isFocusTarget(day) ? 0 : -1}
																		type="button"
																	>
																		{formatDay(date, dateLib.options, dateLib)}
																	</components.DayButton>
																) : (
																	!modifiers.hidden &&
																	formatDay(day.date, dateLib.options, dateLib)
																)}
															</components.Day>
														);
													})}
												</components.Week>
											);
										})}
									</components.Weeks>
								</components.MonthGrid>
							</components.Month>
						);
					})}
				</components.Months>
				{props.footer && (
					// biome-ignore lint/a11y/useSemanticElements: not needed
					<components.Footer
						aria-live="polite"
						className={classNames[UI.Footer]}
						role="status"
						style={styles?.[UI.Footer]}
					>
						{props.footer}
					</components.Footer>
				)}
			</components.Root>
		</dayPickerContext.Provider>
	);
}
