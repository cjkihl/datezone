import { getUTCtoLocalOffsetMinutes } from "datezone";

const offset = getUTCtoLocalOffsetMinutes(Date.now());
console.log(offset);

// offset is the local timezone offset in minutes
