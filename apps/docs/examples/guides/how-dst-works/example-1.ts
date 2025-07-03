// This assumption is dangerous!
const _tomorrow = today + 24 * 60 * 60 * 1000; // ❌ Wrong during DST transitions
