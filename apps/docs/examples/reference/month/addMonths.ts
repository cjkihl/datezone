// @ts-nocheck  – simplified demo code
import { addMonths } from "datezone";

const result = addMonths(Date.UTC(2025, 0, 1), 1, "UTC");
console.log(result);
