import { addDays } from "datezone";

// Spring forward in New York (2024-03-10 2:00 AM -> 3:00 AM)
const beforeDST = 1709999940000; // 2024-03-10 01:59 EST
const _afterDST = addDays(beforeDST, 1, "America/New_York");
// afterDST is 1710082740000 which is 2024-03-11 01:59 EDT
