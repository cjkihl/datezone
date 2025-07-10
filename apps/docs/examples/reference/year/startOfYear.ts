// @ts-nocheck  – simplified demo code
import { startOfYear } from "datezone";

const result = startOfYear(Date.UTC(2025, 0, 1), "UTC");
console.log(result);
