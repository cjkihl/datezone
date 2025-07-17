import { minute } from "datezone";

const timestamp = Date.UTC(2024, 0, 1, 12, 10, 15);
console.log("Minues", minute(timestamp, "Europe/Stockholm"));
