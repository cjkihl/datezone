import { isPast } from "datezone";

const past = Date.now() - 100000;
const future = Date.now() + 100000;

console.log(isPast(past)); // true
console.log(isPast(future)); // false
