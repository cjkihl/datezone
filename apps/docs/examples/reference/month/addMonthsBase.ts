// @ts-nocheck  – simplified demo code
import { addMonthsBase } from "datezone";

const result = addMonthsBase(Date.UTC(2025, 0, 1), 1, "UTC");
console.log(result);
