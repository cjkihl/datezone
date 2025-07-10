// @ts-nocheck  – simplified demo code
import { isTodayBase } from "datezone";

const result = isTodayBase(Date.UTC(2025, 0, 1), "UTC");
console.log(result);
