// ✅ Input validation
function _validateEventTime(timestamp: number): boolean {
	if (!Number.isInteger(timestamp)) {
		throw new Error("Timestamp must be an integer");
	}

	const minDate = new Date("1900-01-01").getTime();
	const maxDate = new Date("2100-01-01").getTime();

	if (timestamp < minDate || timestamp > maxDate) {
		throw new Error("Date must be between 1900 and 2100");
	}

	return true;
}
