// @ts-nocheck  – simplified demo code
import { addWeeksBase } from "datezone";

const result = addWeeksBase(Date.UTC(2025, 0, 1), 1, "UTC");
console.log(result);
