// Example usage of the 'getDay' export from datezone
import { getDay } from "datezone";

const timestamp = Date.UTC(2024, 0, 1, 12, 10, 15);
console.log("Day of week:", getDay(timestamp, "Europe/Stockholm")); // 6 = Saturday
