// @ts-nocheck  – simplified demo code
import { isSameDay } from "datezone";

const result = isSameDay(Date.UTC(2025, 0, 1), "UTC");
console.log(result);
