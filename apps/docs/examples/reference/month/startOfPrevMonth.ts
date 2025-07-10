// @ts-nocheck  – simplified demo code
import { startOfPrevMonth } from "datezone";

const result = startOfPrevMonth(Date.UTC(2025, 0, 1), "UTC");
console.log(result);
