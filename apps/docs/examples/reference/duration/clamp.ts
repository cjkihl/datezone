import { clamp } from "datezone";

console.log(clamp(-5, 0, 10)); // 0
console.log(clamp(15, 0, 10)); // 10
console.log(clamp(7, 0, 10)); // 7
