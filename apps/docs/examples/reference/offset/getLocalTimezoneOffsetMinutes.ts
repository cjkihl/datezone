// @ts-nocheck  – simplified demo code
import { getLocalTimezoneOffsetMinutes } from "datezone";

const result = getLocalTimezoneOffsetMinutes(Date.UTC(2025, 0, 1));
console.log(result);
