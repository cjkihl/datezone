// @ts-nocheck  – simplified demo code
import { endOfMonth } from "datezone";

const result = endOfMonth(Date.UTC(2025, 0, 1), "UTC");
console.log(result);
