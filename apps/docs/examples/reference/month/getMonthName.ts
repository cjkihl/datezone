import { getMonthName } from "datezone";

const name = getMonthName("en-US", "long", 7);
console.log(name); // "July"

const name2 = getMonthName("es-ES", "short", 7);
console.log(name2); // "jul"

const name3 = getMonthName("en-US", "narrow", 7);
console.log(name3); // "J"
