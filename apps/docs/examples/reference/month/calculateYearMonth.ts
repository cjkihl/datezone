import { calculateYearMonth } from "datezone";

const [year, month] = calculateYearMonth(2024, 7, 2);

console.log({ month, year }); // { month: 9, year: 2024, }
