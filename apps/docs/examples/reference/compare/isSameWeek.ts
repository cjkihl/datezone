// @ts-nocheck  – simplified demo code
import { isSameWeek } from "datezone";

const result = isSameWeek(Date.UTC(2025, 0, 1), "UTC");
console.log(result);
