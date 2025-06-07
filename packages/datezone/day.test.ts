import { describe, expect, it } from "bun:test";
import { endOfDay, nextDay, previousDay, startOfDay } from "./day";

describe("startOfDay", () => {
	it("returns 00:00:00.000 in UTC if no timezone", () => {
		const d = new Date("2024-05-22T15:23:45.123Z");
		const result = startOfDay(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("2024-05-22T00:00:00.000Z");
	});
	it("returns 00:00:00.000 in Asia/Singapore", () => {
		const d = new Date("2024-05-22T15:23:45.123Z");
		const result = startOfDay(d.getTime(), "Asia/Singapore");
		expect(new Date(result).toISOString()).toBe("2024-05-21T16:00:00.000Z");
	});
});

describe("endOfDay", () => {
	it("returns 23:59:59.999 in UTC if no timezone", () => {
		const d = new Date("2024-05-22T15:23:45.123Z");
		const result = endOfDay(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("2024-05-22T23:59:59.999Z");
	});
	it("returns 23:59:59.999 in Asia/Singapore", () => {
		const d = new Date("2024-05-22T15:23:45.123Z");
		const result = endOfDay(d.getTime(), "Asia/Singapore");
		expect(new Date(result).toISOString()).toBe("2024-05-22T15:59:59.999Z");
	});
});

describe("startOfDay edge cases", () => {
	it("handles leap year", () => {
		const d = new Date("2024-02-29T12:00:00Z");
		const result = startOfDay(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("2024-02-29T00:00:00.000Z");
	});
	it("handles DST start (America/New_York)", () => {
		const d = new Date("2024-03-10T07:30:00Z"); // DST start day
		const result = startOfDay(d.getTime(), "America/New_York");
		// Should be 2024-03-10T05:00:00.000Z (midnight local)
		expect(new Date(result).toISOString()).toBe("2024-03-10T05:00:00.000Z");
	});
	it("handles DST end (America/New_York)", () => {
		const d = new Date("2024-11-03T06:30:00Z"); // DST end day
		const result = startOfDay(d.getTime(), "America/New_York");
		// Should be 2024-11-03T04:00:00.000Z (midnight local)
		expect(new Date(result).toISOString()).toBe("2024-11-03T04:00:00.000Z");
	});
	it("handles min date", () => {
		const d = new Date(0);
		const result = startOfDay(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("1970-01-01T00:00:00.000Z");
	});
	it("handles max date", () => {
		const d = new Date("9999-12-31T23:59:59.999Z");
		const result = startOfDay(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("9999-12-31T00:00:00.000Z");
	});
});

describe("endOfDay edge cases", () => {
	it("handles leap year", () => {
		const d = new Date("2024-02-29T12:00:00Z");
		const result = endOfDay(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("2024-02-29T23:59:59.999Z");
	});
	it("handles DST start (America/New_York)", () => {
		const d = new Date("2024-03-10T07:30:00Z"); // DST start day
		const result = endOfDay(d.getTime(), "America/New_York");
		// Should be 2024-03-11T03:59:59.999Z (end of day local)
		expect(new Date(result).toISOString()).toBe("2024-03-11T03:59:59.999Z");
	});
	it("handles DST end (America/New_York)", () => {
		const d = new Date("2024-11-03T06:30:00Z"); // DST end day
		const result = endOfDay(d.getTime(), "America/New_York");
		// Should be 2024-11-04T04:59:59.999Z (end of day local, UTC-5)
		expect(new Date(result).toISOString()).toBe("2024-11-04T04:59:59.999Z");
	});
	it("handles min date", () => {
		const d = new Date(0);
		const result = endOfDay(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("1970-01-01T23:59:59.999Z");
	});
	it("handles max date", () => {
		const d = new Date("9999-12-31T23:59:59.999Z");
		const result = endOfDay(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("9999-12-31T23:59:59.999Z");
	});
});

describe("nextDay", () => {
	it("returns next day 00:00:00.000 in UTC", () => {
		const d = new Date("2024-05-22T15:23:45.123Z");
		const result = nextDay(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("2024-05-23T00:00:00.000Z");
	});
	it("handles month boundary in UTC", () => {
		const d = new Date("2024-05-31T12:00:00.000Z");
		const result = nextDay(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("2024-06-01T00:00:00.000Z");
	});
	it("handles year boundary in UTC", () => {
		const d = new Date("2023-12-31T12:00:00.000Z");
		const result = nextDay(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("2024-01-01T00:00:00.000Z");
	});
	it("handles timezone offset (Asia/Singapore)", () => {
		const d = new Date("2024-05-22T15:23:45.123Z");
		const result = nextDay(d.getTime(), "Asia/Singapore");
		expect(new Date(result).toISOString()).toBe("2024-05-22T16:00:00.000Z");
	});
	it("handles DST start (America/New_York)", () => {
		const d = new Date("2024-03-09T12:00:00.000Z");
		const result = nextDay(d.getTime(), "America/New_York");
		expect(new Date(result).toISOString()).toBe("2024-03-10T05:00:00.000Z");
	});
	it("handles DST end (America/New_York)", () => {
		const d = new Date("2024-11-02T12:00:00.000Z");
		const result = nextDay(d.getTime(), "America/New_York");
		expect(new Date(result).toISOString()).toBe("2024-11-03T04:00:00.000Z");
	});
});

describe("previousDay", () => {
	it("returns previous day 00:00:00.000 in UTC", () => {
		const d = new Date("2024-05-22T15:23:45.123Z");
		const result = previousDay(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("2024-05-21T00:00:00.000Z");
	});
	it("handles month boundary in UTC", () => {
		const d = new Date("2024-06-01T12:00:00.000Z");
		const result = previousDay(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("2024-05-31T00:00:00.000Z");
	});
	it("handles year boundary in UTC", () => {
		const d = new Date("2024-01-01T12:00:00.000Z");
		const result = previousDay(d.getTime(), "UTC");
		expect(new Date(result).toISOString()).toBe("2023-12-31T00:00:00.000Z");
	});
	it("handles timezone offset (Asia/Singapore)", () => {
		const d = new Date("2024-05-22T15:23:45.123Z");
		const result = previousDay(d.getTime(), "Asia/Singapore");
		expect(new Date(result).toISOString()).toBe("2024-05-20T16:00:00.000Z");
	});
	it("handles DST start (America/New_York)", () => {
		const d = new Date("2024-03-10T12:00:00.000Z");
		const result = previousDay(d.getTime(), "America/New_York");
		expect(new Date(result).toISOString()).toBe("2024-03-09T05:00:00.000Z");
	});
	it("handles DST end (America/New_York)", () => {
		const d = new Date("2024-11-03T12:00:00.000Z");
		const result = previousDay(d.getTime(), "America/New_York");
		expect(new Date(result).toISOString()).toBe("2024-11-02T04:00:00.000Z");
	});
});
