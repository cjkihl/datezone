import { isFuture } from "datezone";

const future = Date.now() + 100000;
console.log(isFuture(future)); // true

const past = Date.now() - 100000;
console.log(isFuture(past)); // false
