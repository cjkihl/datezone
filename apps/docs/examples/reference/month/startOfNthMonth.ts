// @ts-nocheck  – simplified demo code
import { startOfNthMonth } from "datezone";

const result = startOfNthMonth(Date.UTC(2025, 0, 1), "UTC");
console.log(result);
