// @ts-nocheck  – simplified demo code
import { startOfWeek } from "datezone";

const result = startOfWeek(Date.UTC(2025, 0, 1), "UTC");
console.log(result);
