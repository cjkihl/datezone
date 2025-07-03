// At 2:00 AM EDT, clocks "fall back" to 1:00 AM EST
// The hour from 1:00 AM to 1:59 AM happens twice!

// This time exists twice on the same day:
const firstOccurrence = new Date("2024-11-03T05:30:00Z").getTime(); // 1:30 AM EDT
const secondOccurrence = new Date("2024-11-03T06:30:00Z").getTime(); // 1:30 AM EST

// Same "wall time", different actual times
console.log(secondOccurrence - firstOccurrence); // 3,600,000 ms apart
