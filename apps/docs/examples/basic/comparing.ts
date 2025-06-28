import { compare } from "datezone";

console.log(compare("2024-06-01", "2024-06-02")); // -1
console.log(compare("2024-06-01", "2024-06-01")); // 0
console.log(compare("2024-06-02", "2024-06-01")); // 1
