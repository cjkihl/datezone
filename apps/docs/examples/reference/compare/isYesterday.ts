// @ts-nocheck  – simplified demo code
import { isYesterday } from "datezone";

const result = isYesterday(Date.UTC(2025, 0, 1), "UTC");
console.log(result);
