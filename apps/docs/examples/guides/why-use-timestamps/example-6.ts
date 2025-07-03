const start = Date.now();
const oneHour = 60 * 60 * 1000;
const end = start + oneHour;

const _duration = end - start; // Always 3,600,000 milliseconds
const _isAfter = end > start; // Always true
