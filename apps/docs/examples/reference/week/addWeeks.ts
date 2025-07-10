// @ts-nocheck  – simplified demo code
import { addWeeks } from "datezone";

const result = addWeeks(Date.UTC(2025, 0, 1), 1, "UTC");
console.log(result);
