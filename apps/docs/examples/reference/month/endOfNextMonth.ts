// @ts-nocheck  – simplified demo code
import { endOfNextMonth } from "datezone";

const result = endOfNextMonth(Date.UTC(2025, 0, 1), "UTC");
console.log(result);
