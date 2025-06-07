import { isToday } from "datezone";

const now = Date.now();
console.log(isToday(now, "UTC"));
