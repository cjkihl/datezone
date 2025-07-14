import { type DSTTimeZone, isDST } from "datezone";

const timezone: DSTTimeZone = "America/New_York";
const _result = isDST(timezone);
// result is true
