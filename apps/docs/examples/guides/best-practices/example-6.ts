// ✅ Timezone validation helper
function isValidTimezone(timezone: string): boolean {
	try {
		Intl.DateTimeFormat(undefined, { timeZone: timezone });
		return true;
	} catch {
		return false;
	}
}

// ✅ Use in API handlers
app.post("/events", (req, res) => {
	const { timeZone } = req.body;

	if (!isValidTimezone(timeZone)) {
		return res.status(400).json({
			error: "Invalid timezone provided",
		});
	}

	// Process event...
});
