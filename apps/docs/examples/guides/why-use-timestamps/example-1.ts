import { format } from "datezone";

const timestamp = 1710436800000;
const formatted = format(timestamp, "America/New_York", { timeZone: "America/New_York" });
// formatted is "3/14/2024"
