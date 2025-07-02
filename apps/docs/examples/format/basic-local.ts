import { format } from "datezone";

const timestamp = new Date(2024, 0, 15, 14, 30, 45).getTime(); // Jan 15, 2024 2:30:45 PM

const userSettings = {
	locale: "en-US",
	timeZone: null, // Use whatever timezone the browser or server is using
};

// Basic date formats
console.log(format(timestamp, "YYYY-MM-DD", userSettings)); // "2024-01-15"
console.log(format(timestamp, "MM/DD/YYYY", userSettings)); // "01/15/2024"
console.log(format(timestamp, "DD/MM/YYYY", userSettings)); // "15/01/2024"

// Time formats
console.log(format(timestamp, "HH:mm:ss", userSettings)); // "14:30:45"
console.log(format(timestamp, "hh:mm A", userSettings)); // "02:30 PM"
console.log(format(timestamp, "h:mm a", userSettings)); // "2:30 pm"

// Combined date and time
console.log(format(timestamp, "YYYY-MM-DD HH:mm:ss", userSettings)); // "2024-01-15 14:30:45"
console.log(format(timestamp, "MMM DD, YYYY at h:mm A", userSettings)); // "Jan 15, 2024 at 2:30 PM"

// Custom separators and text
console.log(format(timestamp, "DD/MM/YY - HH:mm", userSettings)); // "15/01/24 - 14:30"
console.log(format(timestamp, "[Today is] YYYY-MM-DD", userSettings)); // "Today is 2024-01-15"
