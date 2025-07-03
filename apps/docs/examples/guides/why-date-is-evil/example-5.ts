const date = new Date();
const json = JSON.stringify({ date });
const parsed = JSON.parse(json);

// parsed.date is now a string, not a Date object
console.log(typeof parsed.date); // "string"
