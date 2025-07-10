// @ts-nocheck  – simplified demo code
import { subYears } from "datezone";

const result = subYears(Date.UTC(2025, 0, 1), 1, "UTC");
console.log(result);
