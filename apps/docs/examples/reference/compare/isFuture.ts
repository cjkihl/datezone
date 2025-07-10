// @ts-nocheck  – simplified demo code
import { isFuture } from "datezone";

const result = isFuture(Date.UTC(2025, 0, 1), "UTC");
console.log(result);
