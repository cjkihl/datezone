// @ts-nocheck  – simplified demo code
import { addYears } from "datezone";

const result = addYears(Date.UTC(2025, 0, 1), 1, "UTC");
console.log(result);
