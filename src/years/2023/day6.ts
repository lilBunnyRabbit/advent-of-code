import { Day, Flag } from "../../core";
import { asNumber, stringToNumbers } from "../../utils";
import input from "./day6.txt?raw";

const day = new Day(6, input, Flag.AUTO_START);

day.addPart((parser) => {
  const input = parser.input();
  const times = stringToNumbers(input[0].replace(/Time:\s*/, ""));
  const distances = stringToNumbers(input[1].replace(/Distance:\s*/, ""));

  return times.reduce((multiplied, time, i) => {
    const distance = distances[i];

    let count = 0;
    for (let i = 1; i < time; i++) {
      if (i * (time - i) > distance) count++;
    }

    return multiplied * count;
  }, 1);
});

day.addPart((parser) => {
  const input = parser.input();
  const time = asNumber(input[0].replace(/Time:\s*/, "").replace(/\s+/g, ""));
  const distance = asNumber(input[1].replace(/Distance:\s*/, "").replace(/\s+/g, ""));

  let count = 0;
  for (let i = 1; i < time; i++) {
    if (i * (time - i) > distance) count++;
  }

  return count;
});

export default day;
