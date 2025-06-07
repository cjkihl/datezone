// Clean, predictable, testable
const timestamp = Date.now();
const oneHourLater = timestamp + 60 * 60 * 1000;

// This works the same everywhere
console.log(oneHourLater - timestamp === 3600000);
