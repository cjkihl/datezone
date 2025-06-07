import { type DSTTimeZone, isDST } from "datezone";

const timezone: DSTTimeZone = "Europe/Berlin";
const result = isDST(timezone);
console.log(result); // true
