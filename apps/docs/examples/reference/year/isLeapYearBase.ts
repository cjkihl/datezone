// @ts-nocheck  – simplified demo code
import { isLeapYearBase } from "datezone";

const result = isLeapYearBase(Date.UTC(2025, 0, 1), "UTC");
console.log(result);
