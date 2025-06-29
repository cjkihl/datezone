import { year } from "datezone";

const timestamp = new Date(2024, 11, 31, 23, 30).getTime(); // Dec 31, 2024 11:30 PM
const yearInNY = year(timestamp, "America/New_York");
const yearInTokyo = year(timestamp, "Asia/Tokyo");

console.log("Original timestamp:", new Date(timestamp).toISOString());
console.log("Year in NY:", yearInNY);
console.log("Year in Tokyo:", yearInTokyo); // May be different due to timezone
