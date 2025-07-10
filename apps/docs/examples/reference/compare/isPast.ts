// @ts-nocheck  – simplified demo code
import { isPast } from "datezone";

const result = isPast(Date.UTC(2025, 0, 1), "UTC");
console.log(result);
