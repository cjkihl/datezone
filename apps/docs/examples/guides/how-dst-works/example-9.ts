import { addDays } from "datezone";

const now = Date.now();

// ❌ Ambiguous - depends on system timezone
addDays(now, 1, null);

// ✅ Explicit - behavior is predictable
addDays(now, 1, "America/New_York");
