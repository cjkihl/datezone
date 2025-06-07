import { weekDayName } from "datezone";

// Localized weekday names
console.log(weekDayName("en-US", "long", 1)); // "Monday"
console.log(weekDayName("en-US", "short", 5)); // "Fri"
console.log(weekDayName("ja-JP", "narrow", 7)); // "日"
