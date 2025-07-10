// @ts-nocheck  – simplified demo code
import { startOfISOWeek } from "datezone";

const result = startOfISOWeek(Date.UTC(2025, 0, 1), "UTC");
console.log(result);
