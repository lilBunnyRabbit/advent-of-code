import { sumArray } from "../../tools";
import { Day, readInput, readInputByLine, readInputSplit } from "../../utils";

export const Day1: Day = {
  name: "Day 1",
  part_1: () => {
    return Math.max(...readInputSplit(__dirname, /\n\n/).map((data) => sumArray(data.split(/\n/))));
  },
  part_2: () => {
    return sumArray(
      readInputSplit(__dirname, /\n\n/)
        .map((data) => sumArray(data.split(/\n/)))
        .sort((a, b) => b - a)
        .slice(0, 3)
    );
  },
};
