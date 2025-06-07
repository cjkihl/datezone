// Efficient memory usage

// Time timestamp creation
const timestampStart = performance.now();
for (let i = 0; i < 1000000; i++) {
	Date.now();
}
const timestampEnd = performance.now();
const timestampTime = timestampEnd - timestampStart;

// Time Date object creation
const dateStart = performance.now();
for (let i = 0; i < 1000000; i++) {
	new Date();
}
const dateEnd = performance.now();
const dateTime = dateEnd - dateStart;

console.log(`Timestamp loop: ${timestampTime.toFixed(2)}ms`);
console.log(`Date object loop: ${dateTime.toFixed(2)}ms`);
