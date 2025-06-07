const original = Date.now();
const modified = original + 60 * 60 * 1000; // Add 1 hour

// Original is unchanged
console.log(original); // Still the original value
console.log(modified); // New value, original untouched
