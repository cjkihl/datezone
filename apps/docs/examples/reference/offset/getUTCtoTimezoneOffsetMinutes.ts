// @ts-nocheck  – simplified demo code
import { getUTCtoTimezoneOffsetMinutes } from "datezone";

const result = getUTCtoTimezoneOffsetMinutes(Date.UTC(2025, 0, 1));
console.log(result);
