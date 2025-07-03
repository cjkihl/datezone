// ✅ Clear timezone context
function _EventCard({
	event,
	userTimezone,
}: {
	event: Event;
	userTimezone: string;
}) {
	const displayTime = format(event.startTime, "MMM dd, yyyy HH:mm z", {
		locale: "en-US",
		timeZone: userTimezone,
	});

	return (
		<div>
			<h3>{event.name}</h3>
			<p>{displayTime}</p> {/* Shows: "Jan 15, 2024 14:30 EST" */}
		</div>
	);
}
