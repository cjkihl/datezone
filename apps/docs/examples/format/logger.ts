import { format, type TimeZone } from "datezone";

class Logger {
	static log(level: string, message: string, timezone: TimeZone = "UTC"): void {
		const timestamp = format(Date.now(), "YYYY-MM-DD HH:mm:ss.SSS", {
			locale: "en-US",
			timeZone: timezone,
		});
		console.log(`[${timestamp}] ${level.toUpperCase()}: ${message}`);
	}

	static info(message: string, timezone?: TimeZone): void {
		Logger.log("info", message, timezone);
	}

	static error(message: string, timezone?: TimeZone): void {
		Logger.log("error", message, timezone);
	}

	static debug(message: string, timezone?: TimeZone): void {
		Logger.log("debug", message, timezone);
	}
}

// Usage
Logger.info("Application started");
Logger.error("Database connection failed", "America/New_York");
Logger.debug("Processing user request", "Europe/London");
