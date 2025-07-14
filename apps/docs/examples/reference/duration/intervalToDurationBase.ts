import { intervalToDurationBase } from "datezone";

const start = {
	day: 1,
	hour: 0,
	millisecond: 0,
	minute: 0,
	month: 1,
	second: 0,
	year: 2020,
};
const end = {
	day: 2,
	hour: 3,
	millisecond: 6,
	minute: 4,
	month: 2,
	second: 5,
	year: 2021,
};

const duration = intervalToDurationBase(start, end);
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
