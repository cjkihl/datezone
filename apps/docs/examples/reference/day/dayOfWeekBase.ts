import { dayOfWeekBase } from "datezone";

// ISO day of week: 1 (Mon) ... 7 (Sun)
console.log(dayOfWeekBase(2024, 7, 4)); // Independence Day 2024 → Thursday (4)
console.log(dayOfWeekBase(2024, 7, 7)); // Sunday → 7
