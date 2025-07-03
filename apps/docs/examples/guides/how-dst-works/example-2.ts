// At 2:00 AM EST, clocks "spring forward" to 3:00 AM EDT
// The hour from 2:00 AM to 2:59 AM simply doesn't exist!

const beforeTransition = new Date("2024-03-10T06:59:00Z").getTime(); // 1:59 AM EST
const afterTransition = new Date("2024-03-10T07:00:00Z").getTime(); // 3:00 AM EDT

const difference = afterTransition - beforeTransition;
console.log(difference); // 3,600,000 ms (1 hour)
// But only 1 minute of "wall time" passed!
