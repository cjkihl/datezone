// @ts-nocheck  – simplified demo code
import { endOfISOWeek } from "datezone";

const result = endOfISOWeek(Date.UTC(2025, 0, 1), "UTC");
console.log(result);
