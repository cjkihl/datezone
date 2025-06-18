// Import date-fns functions (without timezone extensions for now)
import {
	addDays as fnsAddDays,
	addHours as fnsAddHours,
	addMinutes as fnsAddMinutes,
	addMonths as fnsAddMonths,
	addSeconds as fnsAddSeconds,
	addWeeks as fnsAddWeeks,
	endOfDay as fnsEndOfDay,
	endOfHour as fnsEndOfHour,
	endOfMinute as fnsEndOfMinute,
	endOfMonth as fnsEndOfMonth,
	endOfSecond as fnsEndOfSecond,
	endOfWeek as fnsEndOfWeek,
	format as fnsFormat,
	getDay as fnsGetDay,
	getDayOfYear as fnsGetDayOfYear,
	getHours as fnsGetHours,
	getISOWeek as fnsGetISOWeek,
	getYear as fnsGetYear,
	isAfter as fnsIsAfter,
	isBefore as fnsIsBefore,
	isEqual as fnsIsEqual,
	isFuture as fnsIsFuture,
	isPast as fnsIsPast,
	isSameDay as fnsIsSameDay,
	isSameMonth as fnsIsSameMonth,
	isSameWeek as fnsIsSameWeek,
	isSameYear as fnsIsSameYear,
	isToday as fnsIsToday,
	isTomorrow as fnsIsTomorrow,
	isWeekend as fnsIsWeekend,
	isYesterday as fnsIsYesterday,
	startOfDay as fnsStartOfDay,
	startOfHour as fnsStartOfHour,
	startOfMinute as fnsStartOfMinute,
	startOfMonth as fnsStartOfMonth,
	startOfSecond as fnsStartOfSecond,
	startOfWeek as fnsStartOfWeek,
	subDays as fnsSubDays,
	subHours as fnsSubHours,
	subMinutes as fnsSubMinutes,
	subMonths as fnsSubMonths,
	subSeconds as fnsSubSeconds,
	subWeeks as fnsSubWeeks,
} from "date-fns";

// Import datezone functions
import {
	addDays as dzAddDays,
	addHours as dzAddHours,
	addMinutes as dzAddMinutes,
	addMonths as dzAddMonths,
	addSeconds as dzAddSeconds,
	addWeeks as dzAddWeeks,
	dayOfWeek as dzDayOfWeek,
	dayOfYear as dzDayOfYear,
	endOfDay as dzEndOfDay,
	endOfHour as dzEndOfHour,
	endOfMinute as dzEndOfMinute,
	endOfMonth as dzEndOfMonth,
	endOfSecond as dzEndOfSecond,
	endOfWeek as dzEndOfWeek,
	formatToParts as dzFormatToParts,
	getHour as dzGetHour,
	getTimezoneOffsetMinutes as dzGetTimezoneOffsetMinutes,
	getWeek as dzGetWeek,
	getYear as dzGetYear,
	isAfter as dzIsAfter,
	isBefore as dzIsBefore,
	isEqual as dzIsEqual,
	isFuture as dzIsFuture,
	isPast as dzIsPast,
	isSameDay as dzIsSameDay,
	isSameMonth as dzIsSameMonth,
	isSameWeek as dzIsSameWeek,
	isSameYear as dzIsSameYear,
	isToday as dzIsToday,
	isTomorrow as dzIsTomorrow,
	isWeekend as dzIsWeekend,
	isYesterday as dzIsYesterday,
	nextDay as dzNextDay,
	previousDay as dzPreviousDay,
	startOfDay as dzStartOfDay,
	startOfHour as dzStartOfHour,
	startOfMinute as dzStartOfMinute,
	startOfMonth as dzStartOfMonth,
	startOfSecond as dzStartOfSecond,
	startOfWeek as dzStartOfWeek,
	subDays as dzSubDays,
	subHours as dzSubHours,
	subMinutes as dzSubMinutes,
	subMonths as dzSubMonths,
	subSeconds as dzSubSeconds,
	subWeeks as dzSubWeeks,
	wallTimeToUTC as dzWallTimeToUTC,
} from "datezone";
import { bench, do_not_optimize, group, run } from "mitata";

// Test data
const testTimestamp = new Date("2024-06-15T15:45:30.123Z").getTime();
const testDate = new Date(testTimestamp);
const testTimezone = "America/New_York";
const testTimestamp2 = new Date("2024-06-20T10:30:15.456Z").getTime();
const testDate2 = new Date(testTimestamp2);

console.log("⚡ Datezone vs Date-fns v4 Performance Comparison");
console.log("================================================\n");
console.log(`Test timestamp: ${testTimestamp} (${testDate.toISOString()})`);
console.log(`Test timezone: ${testTimezone}\n`);

// Month operations comparison
group("Month Operations", () => {
	bench("datezone: startOfMonth", function* () {
		yield () => do_not_optimize(dzStartOfMonth(testTimestamp, testTimezone));
	});

	bench("date-fns: startOfMonth (no timezone)", function* () {
		yield () => {
			const result = fnsStartOfMonth(testDate);
			return do_not_optimize(result.getTime());
		};
	});

	bench("datezone: endOfMonth", function* () {
		yield () => do_not_optimize(dzEndOfMonth(testTimestamp, testTimezone));
	});

	bench("date-fns: endOfMonth (no timezone)", function* () {
		yield () => {
			const result = fnsEndOfMonth(testDate);
			return do_not_optimize(result.getTime());
		};
	});

	bench("datezone: addMonths", function* () {
		yield () => do_not_optimize(dzAddMonths(testTimestamp, 3, testTimezone));
	});

	bench("date-fns: addMonths (no timezone)", function* () {
		yield () => {
			const result = fnsAddMonths(testDate, 3);
			return do_not_optimize(result.getTime());
		};
	});

	bench("datezone: subMonths", function* () {
		yield () => do_not_optimize(dzSubMonths(testTimestamp, 2, testTimezone));
	});

	bench("date-fns: subMonths (no timezone)", function* () {
		yield () => {
			const result = fnsSubMonths(testDate, 2);
			return do_not_optimize(result.getTime());
		};
	});
});

// Day operations comparison
group("Day Operations", () => {
	bench("datezone: startOfDay", function* () {
		yield () => do_not_optimize(dzStartOfDay(testTimestamp, testTimezone));
	});

	bench("date-fns: startOfDay (no timezone)", function* () {
		yield () => {
			const result = fnsStartOfDay(testDate);
			return do_not_optimize(result.getTime());
		};
	});

	bench("datezone: endOfDay", function* () {
		yield () => do_not_optimize(dzEndOfDay(testTimestamp, testTimezone));
	});

	bench("date-fns: endOfDay (no timezone)", function* () {
		yield () => {
			const result = fnsEndOfDay(testDate);
			return do_not_optimize(result.getTime());
		};
	});

	bench("datezone: addDays", function* () {
		yield () => do_not_optimize(dzAddDays(testTimestamp, 7, testTimezone));
	});

	bench("date-fns: addDays (no timezone)", function* () {
		yield () => {
			const result = fnsAddDays(testDate, 7);
			return do_not_optimize(result.getTime());
		};
	});

	bench("datezone: subDays", function* () {
		yield () => do_not_optimize(dzSubDays(testTimestamp, 5, testTimezone));
	});

	bench("date-fns: subDays (no timezone)", function* () {
		yield () => {
			const result = fnsSubDays(testDate, 5);
			return do_not_optimize(result.getTime());
		};
	});

	bench("datezone: nextDay", function* () {
		yield () => do_not_optimize(dzNextDay(testTimestamp, testTimezone));
	});

	bench("datezone: previousDay", function* () {
		yield () => do_not_optimize(dzPreviousDay(testTimestamp, testTimezone));
	});

	bench("datezone: dayOfWeek", function* () {
		yield () => do_not_optimize(dzDayOfWeek(testTimestamp, testTimezone));
	});

	bench("date-fns: getDay (no timezone)", function* () {
		yield () => {
			return do_not_optimize(fnsGetDay(testDate));
		};
	});

	bench("datezone: dayOfYear", function* () {
		yield () => do_not_optimize(dzDayOfYear(testTimestamp, testTimezone));
	});

	bench("date-fns: getDayOfYear (no timezone)", function* () {
		yield () => {
			return do_not_optimize(fnsGetDayOfYear(testDate));
		};
	});
});

// Week operations comparison
group("Week Operations", () => {
	bench("datezone: startOfWeek", function* () {
		yield () => do_not_optimize(dzStartOfWeek(testTimestamp, testTimezone));
	});

	bench("date-fns: startOfWeek (no timezone)", function* () {
		yield () => {
			const result = fnsStartOfWeek(testDate);
			return do_not_optimize(result.getTime());
		};
	});

	bench("datezone: endOfWeek", function* () {
		yield () => do_not_optimize(dzEndOfWeek(testTimestamp, testTimezone));
	});

	bench("date-fns: endOfWeek (no timezone)", function* () {
		yield () => {
			const result = fnsEndOfWeek(testDate);
			return do_not_optimize(result.getTime());
		};
	});

	bench("datezone: addWeeks", function* () {
		yield () => do_not_optimize(dzAddWeeks(testTimestamp, 3, testTimezone));
	});

	bench("date-fns: addWeeks (no timezone)", function* () {
		yield () => {
			const result = fnsAddWeeks(testDate, 3);
			return do_not_optimize(result.getTime());
		};
	});

	bench("datezone: subWeeks", function* () {
		yield () => do_not_optimize(dzSubWeeks(testTimestamp, 2, testTimezone));
	});

	bench("date-fns: subWeeks (no timezone)", function* () {
		yield () => {
			const result = fnsSubWeeks(testDate, 2);
			return do_not_optimize(result.getTime());
		};
	});

	bench("datezone: getWeek", function* () {
		yield () => do_not_optimize(dzGetWeek(testTimestamp, testTimezone));
	});

	bench("date-fns: getISOWeek (no timezone)", function* () {
		yield () => {
			return do_not_optimize(fnsGetISOWeek(testDate));
		};
	});
});

// Hour operations comparison
group("Hour Operations", () => {
	bench("datezone: startOfHour", function* () {
		yield () => do_not_optimize(dzStartOfHour(testTimestamp, testTimezone));
	});

	bench("date-fns: startOfHour (no timezone)", function* () {
		yield () => {
			const result = fnsStartOfHour(testDate);
			return do_not_optimize(result.getTime());
		};
	});

	bench("datezone: endOfHour", function* () {
		yield () => do_not_optimize(dzEndOfHour(testTimestamp, testTimezone));
	});

	bench("date-fns: endOfHour (no timezone)", function* () {
		yield () => {
			const result = fnsEndOfHour(testDate);
			return do_not_optimize(result.getTime());
		};
	});

	bench("datezone: addHours", function* () {
		yield () => do_not_optimize(dzAddHours(testTimestamp, 6, testTimezone));
	});

	bench("date-fns: addHours (no timezone)", function* () {
		yield () => {
			const result = fnsAddHours(testDate, 6);
			return do_not_optimize(result.getTime());
		};
	});

	bench("datezone: subHours", function* () {
		yield () => do_not_optimize(dzSubHours(testTimestamp, 4, testTimezone));
	});

	bench("date-fns: subHours (no timezone)", function* () {
		yield () => {
			const result = fnsSubHours(testDate, 4);
			return do_not_optimize(result.getTime());
		};
	});

	bench("datezone: getHour", function* () {
		yield () => do_not_optimize(dzGetHour(testTimestamp, testTimezone));
	});

	bench("date-fns: getHours (no timezone)", function* () {
		yield () => {
			return do_not_optimize(fnsGetHours(testDate));
		};
	});
});

// Minute operations comparison
group("Minute Operations", () => {
	bench("datezone: startOfMinute", function* () {
		yield () => do_not_optimize(dzStartOfMinute(testTimestamp, testTimezone));
	});

	bench("date-fns: startOfMinute (no timezone)", function* () {
		yield () => {
			const result = fnsStartOfMinute(testDate);
			return do_not_optimize(result.getTime());
		};
	});

	bench("datezone: endOfMinute", function* () {
		yield () => do_not_optimize(dzEndOfMinute(testTimestamp, testTimezone));
	});

	bench("date-fns: endOfMinute (no timezone)", function* () {
		yield () => {
			const result = fnsEndOfMinute(testDate);
			return do_not_optimize(result.getTime());
		};
	});

	bench("datezone: addMinutes", function* () {
		yield () => do_not_optimize(dzAddMinutes(testTimestamp, 30, testTimezone));
	});

	bench("date-fns: addMinutes (no timezone)", function* () {
		yield () => {
			const result = fnsAddMinutes(testDate, 30);
			return do_not_optimize(result.getTime());
		};
	});

	bench("datezone: subMinutes", function* () {
		yield () => do_not_optimize(dzSubMinutes(testTimestamp, 15, testTimezone));
	});

	bench("date-fns: subMinutes (no timezone)", function* () {
		yield () => {
			const result = fnsSubMinutes(testDate, 15);
			return do_not_optimize(result.getTime());
		};
	});
});

// Second operations comparison
group("Second Operations", () => {
	bench("datezone: startOfSecond", function* () {
		yield () => do_not_optimize(dzStartOfSecond(testTimestamp, testTimezone));
	});

	bench("date-fns: startOfSecond (no timezone)", function* () {
		yield () => {
			const result = fnsStartOfSecond(testDate);
			return do_not_optimize(result.getTime());
		};
	});

	bench("datezone: endOfSecond", function* () {
		yield () => do_not_optimize(dzEndOfSecond(testTimestamp, testTimezone));
	});

	bench("date-fns: endOfSecond (no timezone)", function* () {
		yield () => {
			const result = fnsEndOfSecond(testDate);
			return do_not_optimize(result.getTime());
		};
	});

	bench("datezone: addSeconds", function* () {
		yield () => do_not_optimize(dzAddSeconds(testTimestamp, 45, testTimezone));
	});

	bench("date-fns: addSeconds (no timezone)", function* () {
		yield () => {
			const result = fnsAddSeconds(testDate, 45);
			return do_not_optimize(result.getTime());
		};
	});

	bench("datezone: subSeconds", function* () {
		yield () => do_not_optimize(dzSubSeconds(testTimestamp, 30, testTimezone));
	});

	bench("date-fns: subSeconds (no timezone)", function* () {
		yield () => {
			const result = fnsSubSeconds(testDate, 30);
			return do_not_optimize(result.getTime());
		};
	});
});

// Formatting operations comparison
group("Formatting Operations", () => {
	bench("datezone: formatToParts", function* () {
		yield () =>
			do_not_optimize(
				dzFormatToParts(testTimestamp, testTimezone, {
					day: "2-digit",
					hour: "2-digit",
					minute: "2-digit",
					month: "2-digit",
					second: "2-digit",
					year: "numeric",
				}),
			);
	});

	bench("date-fns: format (no timezone)", function* () {
		yield () => {
			const result = fnsFormat(testDate, "yyyy-MM-dd HH:mm:ss");
			return do_not_optimize(result);
		};
	});

	bench("native: Intl.DateTimeFormat", function* () {
		yield () => {
			const formatter = new Intl.DateTimeFormat("en-US", {
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
				month: "2-digit",
				second: "2-digit",
				timeZone: testTimezone,
				year: "numeric",
			});
			return do_not_optimize(formatter.formatToParts(testTimestamp));
		};
	});
});

// Comparison operations
group("Date Comparison Operations", () => {
	bench("datezone: isBefore", function* () {
		yield () =>
			do_not_optimize(dzIsBefore(testTimestamp, testTimestamp2, testTimezone));
	});

	bench("date-fns: isBefore (no timezone)", function* () {
		yield () => {
			return do_not_optimize(fnsIsBefore(testDate, testDate2));
		};
	});

	bench("datezone: isAfter", function* () {
		yield () =>
			do_not_optimize(dzIsAfter(testTimestamp, testTimestamp2, testTimezone));
	});

	bench("date-fns: isAfter (no timezone)", function* () {
		yield () => {
			return do_not_optimize(fnsIsAfter(testDate, testDate2));
		};
	});

	bench("datezone: isEqual", function* () {
		yield () =>
			do_not_optimize(dzIsEqual(testTimestamp, testTimestamp, testTimezone));
	});

	bench("date-fns: isEqual (no timezone)", function* () {
		yield () => {
			return do_not_optimize(fnsIsEqual(testDate, testDate));
		};
	});

	bench("datezone: isSameDay", function* () {
		yield () =>
			do_not_optimize(dzIsSameDay(testTimestamp, testTimestamp2, testTimezone));
	});

	bench("date-fns: isSameDay (no timezone)", function* () {
		yield () => {
			return do_not_optimize(fnsIsSameDay(testDate, testDate2));
		};
	});

	bench("datezone: isSameWeek", function* () {
		yield () =>
			do_not_optimize(
				dzIsSameWeek(testTimestamp, testTimestamp2, testTimezone),
			);
	});

	bench("date-fns: isSameWeek (no timezone)", function* () {
		yield () => {
			return do_not_optimize(fnsIsSameWeek(testDate, testDate2));
		};
	});

	bench("datezone: isSameMonth", function* () {
		yield () =>
			do_not_optimize(
				dzIsSameMonth(testTimestamp, testTimestamp2, testTimezone),
			);
	});

	bench("date-fns: isSameMonth (no timezone)", function* () {
		yield () => {
			return do_not_optimize(fnsIsSameMonth(testDate, testDate2));
		};
	});

	bench("datezone: isSameYear", function* () {
		yield () =>
			do_not_optimize(
				dzIsSameYear(testTimestamp, testTimestamp2, testTimezone),
			);
	});

	bench("date-fns: isSameYear (no timezone)", function* () {
		yield () => {
			return do_not_optimize(fnsIsSameYear(testDate, testDate2));
		};
	});
});

// Date relative operations
group("Date Relative Operations", () => {
	bench("datezone: isToday", function* () {
		yield () => do_not_optimize(dzIsToday(testTimestamp, testTimezone));
	});

	bench("date-fns: isToday (no timezone)", function* () {
		yield () => {
			return do_not_optimize(fnsIsToday(testDate));
		};
	});

	bench("datezone: isTomorrow", function* () {
		yield () => do_not_optimize(dzIsTomorrow(testTimestamp, testTimezone));
	});

	bench("date-fns: isTomorrow (no timezone)", function* () {
		yield () => {
			return do_not_optimize(fnsIsTomorrow(testDate));
		};
	});

	bench("datezone: isYesterday", function* () {
		yield () => do_not_optimize(dzIsYesterday(testTimestamp, testTimezone));
	});

	bench("date-fns: isYesterday (no timezone)", function* () {
		yield () => {
			return do_not_optimize(fnsIsYesterday(testDate));
		};
	});

	bench("datezone: isPast", function* () {
		yield () => do_not_optimize(dzIsPast(testTimestamp, testTimezone));
	});

	bench("date-fns: isPast (no timezone)", function* () {
		yield () => {
			return do_not_optimize(fnsIsPast(testDate));
		};
	});

	bench("datezone: isFuture", function* () {
		yield () => do_not_optimize(dzIsFuture(testTimestamp, testTimezone));
	});

	bench("date-fns: isFuture (no timezone)", function* () {
		yield () => {
			return do_not_optimize(fnsIsFuture(testDate));
		};
	});

	bench("datezone: isWeekend", function* () {
		yield () => do_not_optimize(dzIsWeekend(testTimestamp, testTimezone));
	});

	bench("date-fns: isWeekend (no timezone)", function* () {
		yield () => {
			return do_not_optimize(fnsIsWeekend(testDate));
		};
	});
});

// Getter operations
group("Getter Operations", () => {
	bench("datezone: getYear", function* () {
		yield () => do_not_optimize(dzGetYear(testTimestamp, testTimezone));
	});

	bench("date-fns: getYear (no timezone)", function* () {
		yield () => {
			return do_not_optimize(fnsGetYear(testDate));
		};
	});
});

// Complex operations comparison
group("Complex Operations", () => {
	bench("datezone: complex workflow", function* () {
		yield () => {
			// Simulate a typical workflow: get start of month, add some days, format
			const monthStart = dzStartOfMonth(testTimestamp, testTimezone);
			const adjusted = dzAddDays(monthStart, 15, testTimezone);
			const parts = dzFormatToParts(adjusted, testTimezone, {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			return do_not_optimize(parts);
		};
	});

	bench("date-fns: complex workflow", function* () {
		yield () => {
			// Equivalent workflow with date-fns (no timezone handling)
			const monthStart = fnsStartOfMonth(testDate);
			const adjusted = fnsAddDays(monthStart, 15);
			const result = fnsFormat(adjusted, "yyyy-MM-dd");
			return do_not_optimize(result);
		};
	});
});

// Memory-intensive operations
group("Memory Patterns", () => {
	bench("datezone: repeated operations", function* () {
		yield () => {
			const results = [];
			for (let i = 0; i < 1000; i++) {
				const ts = testTimestamp + i * 86400000; // Add days
				results.push(dzStartOfMonth(ts, testTimezone));
			}
			return do_not_optimize(results);
		};
	}).gc("inner");

	bench("date-fns: repeated operations", function* () {
		yield () => {
			const results = [];
			for (let i = 0; i < 1000; i++) {
				const date = new Date(testTimestamp + i * 86400000);
				const monthStart = fnsStartOfMonth(date);
				results.push(monthStart.getTime());
			}
			return do_not_optimize(results);
		};
	}).gc("inner");
});

// High-frequency operations (render loop simulation)
group("High-Frequency Operations", () => {
	bench("datezone: hot path", function* () {
		yield () => {
			// Simulate rapid updates in a UI component
			const results = [];
			for (let i = 0; i < 100; i++) {
				const ts = testTimestamp + i * 60000; // Add minutes
				const parts = dzFormatToParts(ts, testTimezone, {
					hour: "2-digit",
					minute: "2-digit",
				});
				results.push(parts);
			}
			return do_not_optimize(results);
		};
	});

	bench("date-fns: hot path", function* () {
		yield () => {
			const results = [];
			for (let i = 0; i < 100; i++) {
				const date = new Date(testTimestamp + i * 60000);
				const formatted = fnsFormat(date, "HH:mm");
				results.push(formatted);
			}
			return do_not_optimize(results);
		};
	});
});

// Timezone-specific operations (datezone only)
group("Timezone Operations (Datezone Advantage)", () => {
	bench("datezone: wallTimeToUTC", function* () {
		yield () =>
			do_not_optimize(
				dzWallTimeToUTC(2024, 6, 15, 12, 30, 45, 123, testTimezone),
			);
	});

	bench("datezone: getTimezoneOffsetMinutes", function* () {
		yield () =>
			do_not_optimize(
				dzGetTimezoneOffsetMinutes(testTimestamp, "UTC", testTimezone),
			);
	});

	bench("datezone: multiple timezone formatting", function* () {
		yield () => {
			const timezones = [
				"UTC",
				"America/New_York",
				"Europe/London",
				"Asia/Tokyo",
			];
			const results = timezones.map((tz) =>
				dzFormatToParts(testTimestamp, tz, {
					hour: "2-digit",
					minute: "2-digit",
					timeZoneName: "short",
				}),
			);
			return do_not_optimize(results);
		};
	});

	bench("native: equivalent multiple timezone formatting", function* () {
		yield () => {
			const timezones = [
				"UTC",
				"America/New_York",
				"Europe/London",
				"Asia/Tokyo",
			];
			const results = timezones.map((tz) => {
				const formatter = new Intl.DateTimeFormat("en-US", {
					hour: "2-digit",
					minute: "2-digit",
					timeZone: tz,
					timeZoneName: "short",
				});
				return formatter.formatToParts(testTimestamp);
			});
			return do_not_optimize(results);
		};
	});
});

// Real-world scenario benchmarks
group("Real-World Scenarios", () => {
	bench("datezone: calendar month generation", function* () {
		yield () => {
			const now = Date.now();
			const timezone = "America/New_York";

			// Generate a month view with 42 days (6 weeks)
			const monthStart = dzStartOfMonth(now, timezone);
			const results = [];

			for (let i = 0; i < 42; i++) {
				const dayTs = dzAddDays(monthStart, i - 7, timezone);
				const dayStart = dzStartOfDay(dayTs, timezone);
				const parts = dzFormatToParts(dayStart, timezone, {
					day: "2-digit",
					month: "2-digit",
					year: "numeric",
				});
				results.push(parts);
			}

			return do_not_optimize(results);
		};
	});

	bench("date-fns: calendar month generation (no timezone)", function* () {
		yield () => {
			const now = new Date();

			// Generate a month view with 42 days (6 weeks)
			const monthStart = fnsStartOfMonth(now);
			const results = [];

			for (let i = 0; i < 42; i++) {
				const dayDate = fnsAddDays(monthStart, i - 7);
				const dayStart = fnsStartOfDay(dayDate);
				const formatted = fnsFormat(dayStart, "yyyy-MM-dd");
				results.push(formatted);
			}

			return do_not_optimize(results);
		};
	});

	bench("datezone: time manipulation chain", function* () {
		yield () => {
			// Complex chain of operations
			let ts = testTimestamp;
			ts = dzStartOfDay(ts, testTimezone);
			ts = dzAddHours(ts, 9, testTimezone); // 9 AM
			ts = dzAddMinutes(ts, 30, testTimezone); // 9:30 AM
			ts = dzAddDays(ts, 5, testTimezone); // Next weekday
			const isWeekendDay = dzIsWeekend(ts, testTimezone);
			const parts = dzFormatToParts(ts, testTimezone, {
				hour: "2-digit",
				minute: "2-digit",
				weekday: "long",
			});
			return do_not_optimize({ isWeekendDay, parts });
		};
	});

	bench("date-fns: time manipulation chain", function* () {
		yield () => {
			// Equivalent chain with date-fns
			let date = fnsStartOfDay(testDate);
			date = fnsAddHours(date, 9); // 9 AM
			date = fnsAddMinutes(date, 30); // 9:30 AM
			date = fnsAddDays(date, 5); // Next weekday
			const isWeekendDay = fnsIsWeekend(date);
			const formatted = fnsFormat(date, "EEEE HH:mm");
			return do_not_optimize({ formatted, isWeekendDay });
		};
	});
});

// Run comparison benchmarks
await run();
