const date = new Date("2024-01-01"); // Creates a new Date 2024-01-01 00:00 UTC

console.log("Unmodified date", date);
const newDate = new Date(date.setDate(date.getDate() + 1));
console.log("New date", newDate);
console.log("Modified date", date);
