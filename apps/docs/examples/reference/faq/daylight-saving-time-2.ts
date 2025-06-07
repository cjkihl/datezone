import { addHours } from "datezone";

// Spring forward in New York (2024-03-10 2:00 AM -> 3:00 AM)
const beforeDST = 1710000000000; // 2024-03-10 01:30 EST
const _afterDST = addHours(beforeDST, 1);
// afterDST is 1710003600000 which is 2024-03-10 02:30 EST
