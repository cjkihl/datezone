import { isTomorrow } from "datezone";

const now = Date.now();
const tomorrow = now + 24 * 60 * 60 * 1000;
console.log(isTomorrow(tomorrow, "UTC"));
