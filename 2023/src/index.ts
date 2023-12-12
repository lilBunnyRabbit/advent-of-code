import Day1 from "./days/day-1";
import Day2 from "./days/day-2";
import Day3 from "./days/day-3";
import Day4 from "./days/day-4";
import Day5 from "./days/day-5";

// const days = [Day1, Day2, Day3, Day4];

// Promise.all(days.map(async (day) => await day.getOutput())).then((outputs) => console.log(outputs.join("\n")));

Day5.getOutput().then(console.log).catch(console.error);
