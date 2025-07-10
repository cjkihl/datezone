// @ts-nocheck  – simplified demo code
import { isWeekend } from "datezone";

const result = isWeekend(Date.UTC(2025, 0, 1), "UTC");
console.log(result);
