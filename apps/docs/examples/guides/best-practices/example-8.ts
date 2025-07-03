// ✅ Simple timezone formatter cache
const formatCache = new Map<string, string>();

function _formatWithCache(
	timestamp: number,
	pattern: string,
	timezone: string,
): string {
	const key = `${timestamp}-${pattern}-${timezone}`;

	if (formatCache.has(key)) {
		return formatCache.get(key)!;
	}

	const formatted = format(timestamp, pattern, { timeZone: timezone });
	formatCache.set(key, formatted);
	return formatted;
}
