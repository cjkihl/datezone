// @ts-nocheck  – simplified demo code
import { isAfter } from "datezone";

const result = isAfter(Date.UTC(2025, 0, 1), "UTC");
console.log(result);
