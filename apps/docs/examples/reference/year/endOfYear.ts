// @ts-nocheck  – simplified demo code
import { endOfYear } from "datezone";

const result = endOfYear(Date.UTC(2025, 0, 1), "UTC");
console.log(result);
