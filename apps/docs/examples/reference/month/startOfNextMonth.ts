// @ts-nocheck  – simplified demo code
import { startOfNextMonth } from "datezone";

const result = startOfNextMonth(Date.UTC(2025, 0, 1), "UTC");
console.log(result);
