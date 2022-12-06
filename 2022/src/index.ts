import Day1 from "./days/day-1/day1";
import Day2 from "./days/day-2/day2";
import Day3 from "./days/day-3/day3";
import Day4 from "./days/day-4/day4";
import Day5 from "./days/day-5/day5";
import Day6 from "./days/day-6/day6";

const days = [Day1, Day2, Day3, Day4, Day5, Day6];

Promise.all(days.map(async (day) => await day.getOutput())).then((outputs) => console.log(outputs.join("\n")));
