import { isYesterday } from "datezone";

const now = Date.now();
const yesterday = now - 24 * 60 * 60 * 1000;
console.log(isYesterday(yesterday, "UTC"));
