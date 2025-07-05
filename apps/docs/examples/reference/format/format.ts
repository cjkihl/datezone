import { format, type TimeZone } from "datezone";

// Current timestamp
const now = Date.now();

// Example timezone
const timeZone: TimeZone = "America/New_York";

// Format examples
console.log("Basic formatting:");
console.log(format(now, "yyyy-MM-dd", { timeZone }));
console.log(format(now, "MMM dd, yyyy", { timeZone }));
console.log(format(now, "h:mm a", { timeZone }));
console.log(format(now, "EEEE, MMMM do, yyyy", { timeZone }));

// With different locales
console.log("\nWith different locales:");
console.log(format(now, "MMMM dd, yyyy", { locale: "en-US", timeZone }));
console.log(format(now, "dd MMMM yyyy", { locale: "es-ES", timeZone }));

// Complex formatting
console.log("\nComplex format:");
console.log(format(now, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", { timeZone }));
