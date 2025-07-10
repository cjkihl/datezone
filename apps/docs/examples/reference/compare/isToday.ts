// @ts-nocheck  – simplified demo code
import { isToday } from "datezone";

const result = isToday(Date.UTC(2025, 0, 1), "UTC");
console.log(result);
