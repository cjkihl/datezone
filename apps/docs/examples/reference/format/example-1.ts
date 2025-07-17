import { format } from "datezone";

// Basic usage
format(1392076800000, "yyyy-MM-dd"); // '2014-02-11'

// Escaping text
format(1404322800000, "h 'o''clock'"); // "3 o'clock"

// Localized output
format(1392076800000, "PPPP", { locale: "en-US" }); // 'Tuesday, February 11th, 2014'
