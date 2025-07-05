import { getDayPeriod } from "datezone";

console.log(getDayPeriod("en-US", 9)); // AM
console.log(getDayPeriod("en-US", 15)); // PM
console.log(getDayPeriod("fr-FR", 23)); // PM in French locale
