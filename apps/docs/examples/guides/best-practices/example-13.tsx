// ✅ Timezone selector with user-friendly defaults
function _TimezoneSelector({ value, onChange }: TimezoneProps) {
	const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const commonTimezones = [
		"America/New_York",
		"America/Chicago",
		"America/Denver",
		"America/Los_Angeles",
		"Europe/London",
		"UTC",
	];

	return (
		<select onChange={onChange} value={value || userTimezone}>
			<optgroup label="Detected">
				<option value={userTimezone}>{userTimezone} (Local)</option>
			</optgroup>
			<optgroup label="Common">
				{commonTimezones.map((tz) => (
					<option key={tz} value={tz}>
						{tz}
					</option>
				))}
			</optgroup>
		</select>
	);
}
