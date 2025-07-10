// @ts-nocheck  – simplified demo code
import { endOfPrevMonth } from "datezone";

const result = endOfPrevMonth(Date.UTC(2025, 0, 1), "UTC");
console.log(result);
