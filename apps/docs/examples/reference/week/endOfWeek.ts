// @ts-nocheck  – simplified demo code
import { endOfWeek } from "datezone";

const result = endOfWeek(Date.UTC(2025, 0, 1), "UTC");
console.log(result);
