// These similar constructors behaves differently:

// Use a Date in the constructor, interpeted as UTC, no problem.
console.log(new Date("2024-01-01"));

// Add Time to the string, now it's interpreted as LOCAL time.
console.log(new Date("2024-01-01T00:00:00"));

// Add a Z to the end of the string, now it's interpreted as UTC again
console.log(new Date("2024-01-01T00:00:00Z"));
