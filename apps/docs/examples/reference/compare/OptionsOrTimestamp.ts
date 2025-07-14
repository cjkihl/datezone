import { type OptionsOrTimestamp, isToday } from "datezone";

const today: OptionsOrTimestamp = {
  year: 2024,
  month: 7,
  day: 11,
};

const result = isToday(Date.now(), "America/New_York");
// result is true
