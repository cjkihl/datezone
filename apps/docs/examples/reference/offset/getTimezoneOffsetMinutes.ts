// @ts-nocheck  – simplified demo code
import { getTimezoneOffsetMinutes } from "datezone";

const result = getTimezoneOffsetMinutes(Date.UTC(2025, 0, 1));
console.log(result);
