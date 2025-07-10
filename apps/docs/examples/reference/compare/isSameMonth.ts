// @ts-nocheck  – simplified demo code
import { isSameMonth } from "datezone";

const result = isSameMonth(Date.UTC(2025, 0, 1), "UTC");
console.log(result);
