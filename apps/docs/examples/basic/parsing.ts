import { wallTimeToTS } from "datezone";

// Parse using wallTimeToTS for precise control
const date = wallTimeToTS(2024, 6, 1, 12, 0, 0, 0, "UTC");

// Or parse from a Date object
const dateFromJS = new Date("2024-06-01T12:00:00Z").getTime();

console.log("Parsed from wallTimeToTS:", date);
console.log("Parsed from Date:", dateFromJS);
