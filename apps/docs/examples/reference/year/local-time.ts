import { getDaysInYear } from "datezone";

const timestamp2024 = new Date(2024, 0, 1).getTime(); // 2024 (leap year)
const timestamp2023 = new Date(2023, 0, 1).getTime(); // 2023 (not leap year)

console.log(getDaysInYear(timestamp2024)); // 366
console.log(getDaysInYear(timestamp2023)); // 365

// Using year options
console.log(getDaysInYear({ year: 2000 })); // 366 (leap year)
console.log(getDaysInYear({ year: 1900 })); // 365 (not leap year)
