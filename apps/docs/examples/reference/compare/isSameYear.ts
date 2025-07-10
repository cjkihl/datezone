// @ts-nocheck  – simplified demo code
import { isSameYear } from "datezone";

const result = isSameYear(Date.UTC(2025, 0, 1), "UTC");
console.log(result);
