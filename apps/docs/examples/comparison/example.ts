// Unified packages, Pure timestamps

import { TZDate } from "@date-fns/tz";
import * as dateFns from "date-fns";
import { addDays, format, type TimeZone } from "datezone";

const date = Date.UTC(2024, 5, 1, 8, 0, 0, 0); // 2024-06-01 08:00:00 UTC
const date2 = Date.UTC(2024, 5, 1, 9, 0, 0, 0); // 2024-06-01 08:00:00 UTC

const timeZone: TimeZone = "Etc/GMT+1"; // GMT+1 (NO DST)

const dateFnsDate = new TZDate(date, timeZone);
const dateFnsDate2 = new TZDate(date2, timeZone);

// Adds 5 days in the Europe/Stockholm timezone
const datezoneFuture = addDays(date, 5, timeZone);
const datezoneFuture2 = addDays(date2, 5, timeZone);

// Date Fns Add 5 days in the Europe/Stockholm timezone
const dateFnsFuture = dateFns.addDays(dateFnsDate, 5);
const dateFnsFuture2 = dateFns.addDays(dateFnsDate2, 5);

const f = "yyyy-MM-dd HH:mm:ss";

console.log({
	dateFns: {
		result1: {
			client: dateFns.format(dateFnsFuture, f),
			stockholm: dateFns.format(dateFnsFuture, f),
		},
		result2: {
			client: dateFns.format(dateFnsFuture2, f),
			stockholm: dateFns.format(dateFnsFuture2, f),
		},
	},
	datezone: {
		result1: {
			client: format(datezoneFuture, "yyyy-MM-dd HH:mm:ss", {
				timeZone: null,
			}),
			stockholm: format(datezoneFuture, "yyyy-MM-dd HH:mm:ss", {
				timeZone: "Europe/Stockholm",
			}),
		},
		result2: {
			client: format(datezoneFuture2, "yyyy-MM-dd HH:mm:ss", {
				timeZone: null,
			}),
			stockholm: format(datezoneFuture2, "yyyy-MM-dd HH:mm:ss", {
				timeZone: "Europe/Stockholm",
			}),
		},
	},
});

// Output from bun run ./example.ts
// {
// 	dateFns: {
// 	  result1: {
// 		client: "2024-06-06 16:00:00",
// 		stockholm: "2024-06-06 16:00:00",
// 	  },
// 	  result2: {
// 		client: "2024-06-06 17:00:00",
// 		stockholm: "2024-06-06 17:00:00",
// 	  },
// 	},
// 	datezone: {
// 	  result1: {
// 		client: "2024-06-06 16:00:00",
// 		stockholm: "2024-06-06 10:00:00",
// 	  },
// 	  result2: {
// 		client: "2024-06-06 17:00:00",
// 		stockholm: "2024-06-06 11:00:00",
// 	  },
// 	},
//   }
