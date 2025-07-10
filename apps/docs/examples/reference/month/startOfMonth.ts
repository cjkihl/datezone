// @ts-nocheck  – simplified demo code
import { startOfMonth } from "datezone";

const result = startOfMonth(Date.UTC(2025, 0, 1), "UTC");
console.log(result);
