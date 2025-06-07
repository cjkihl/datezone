import { intervalToDuration } from "datezone";

const start = Date.UTC(2020, 0, 1, 0, 0, 0, 0); // 2020-01-01T00:00:00.000Z
const end = Date.UTC(2021, 1, 2, 3, 4, 5, 6); // 2021-02-02T03:04:05.006Z

const duration = intervalToDuration(start, end, "UTC");
console.log(duration);
// {
//   year: 1,
//   month: 1,
//   day: 1,
//   hour: 3,
//   minute: 4,
//   second: 5,
//   millisecond: 6
// }
