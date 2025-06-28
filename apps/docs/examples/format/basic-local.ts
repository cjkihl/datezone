import { format } from "datezone";

const timestamp = new Date(2024, 0, 15, 14, 30, 45).getTime(); // Jan 15, 2024 2:30:45 PM

// Basic date formats
console.log(format(timestamp, "YYYY-MM-DD", { locale: "en-US" })); // "2024-01-15"
console.log(format(timestamp, "MM/DD/YYYY", { locale: "en-US" })); // "01/15/2024"
console.log(format(timestamp, "DD/MM/YYYY", { locale: "en-US" })); // "15/01/2024"

// Time formats
console.log(format(timestamp, "HH:mm:ss", { locale: "en-US" })); // "14:30:45"
console.log(format(timestamp, "hh:mm A", { locale: "en-US" })); // "02:30 PM"
console.log(format(timestamp, "h:mm a", { locale: "en-US" })); // "2:30 pm"

// Combined date and time
console.log(format(timestamp, "YYYY-MM-DD HH:mm:ss", { locale: "en-US" })); // "2024-01-15 14:30:45"
console.log(format(timestamp, "MMM DD, YYYY at h:mm A", { locale: "en-US" })); // "Jan 15, 2024 at 2:30 PM"

// Custom separators and text
console.log(format(timestamp, "DD/MM/YY - HH:mm", { locale: "en-US" })); // "15/01/24 - 14:30"
console.log(format(timestamp, "[Today is] YYYY-MM-DD", { locale: "en-US" })); // "Today is 2024-01-15"
