// @ts-nocheck  – simplified demo code
import { isBefore } from "datezone";

const result = isBefore(Date.UTC(2025, 0, 1), "UTC");
console.log(result);
