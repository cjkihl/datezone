// Example usage of the 'parseISO' export from datezone
import { parseISO } from "datezone";

const isoString = "2024-06-01T12:34:56Z";
const date = parseISO(isoString);
console.log("Parsed timestamp:", date);
