// @ts-nocheck  – simplified demo code
import { subWeeks } from "datezone";

const result = subWeeks(Date.UTC(2025, 0, 1), 1, "UTC");
console.log(result);
