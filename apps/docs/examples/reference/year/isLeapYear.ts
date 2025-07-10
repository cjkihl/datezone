// @ts-nocheck  – simplified demo code
import { isLeapYear } from "datezone";

const result = isLeapYear(Date.UTC(2025, 0, 1), "UTC");
console.log(result);
