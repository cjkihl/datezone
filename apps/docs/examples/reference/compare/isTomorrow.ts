// @ts-nocheck  – simplified demo code
import { isTomorrow } from "datezone";

const result = isTomorrow(Date.UTC(2025, 0, 1), "UTC");
console.log(result);
