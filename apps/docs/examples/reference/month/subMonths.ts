// @ts-nocheck  – simplified demo code
import { subMonths } from "datezone";

const result = subMonths(Date.UTC(2025, 0, 1), 1, "UTC");
console.log(result);
