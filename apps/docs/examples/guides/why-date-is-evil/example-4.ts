// This represents midnight UTC on Jan 1, 2024
const date = new Date("2024-01-01");

// But getHours() returns different values on different machines:
expect(date.getHours()).toBe(0); // ✅ Works in UTC
expect(date.getHours()).toBe(19); // ✅ Works in EST (UTC-5)
expect(date.getHours()).toBe(16); // ✅ Works in PST (UTC-8)
expect(date.getHours()).toBe(9); // ✅ Works in JST (UTC+9)
