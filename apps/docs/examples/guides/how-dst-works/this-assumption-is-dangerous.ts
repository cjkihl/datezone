// This assumption is dangerous in calendar apps
const tomorrow = Date.now() + 24 * 60 * 60 * 1000; // ❌ Wrong during DST transitions

console.log("tomorrow", tomorrow);
