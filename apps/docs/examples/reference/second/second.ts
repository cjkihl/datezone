import { second } from "datezone";

const timestamp = Date.UTC(2024, 0, 1, 12, 10, 15);
console.log("Second", second(timestamp)); // 15
