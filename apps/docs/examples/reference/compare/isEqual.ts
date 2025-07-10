// @ts-nocheck  – simplified demo code
import { isEqual } from "datezone";

const result = isEqual(Date.UTC(2025, 0, 1), "UTC");
console.log(result);
