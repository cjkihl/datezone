import { walltimeToTimestamp } from "datezone";

// Parse using walltimeToTimestamp for precise control
const date = walltimeToTimestamp(2024, 6, 1, 12, 0, 0, 0, "UTC");

// Or parse from a Date object
const dateFromJS = new Date("2024-06-01T12:00:00Z").getTime();

console.log("Parsed from walltimeToTimestamp:", date);
console.log("Parsed from Date:", dateFromJS);
