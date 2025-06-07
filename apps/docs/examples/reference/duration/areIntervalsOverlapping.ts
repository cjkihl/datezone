import { areIntervalsOverlapping } from "datezone";

// Check if two intervals [0, 10) and [5, 15) overlap
const overlap = areIntervalsOverlapping(0, 10, 5, 15);
console.log(overlap); // true

// Check if two intervals [0, 5) and [5, 10) overlap (touching but not overlapping)
const noOverlap = areIntervalsOverlapping(0, 5, 5, 10);
console.log(noOverlap); // false
