import { sumArray } from "../../tools";
import { Day, readInputSplit } from "../../utils";

const getItemPriority = (value: string): number => {
  if (value === value.toUpperCase()) {
    return value.charCodeAt(0) - 38;
  }
  return value.charCodeAt(0) - 96;
};

export default Day(3, [
  () => {
    return sumArray(
      readInputSplit(__dirname).map((data) => {
        const len = data.length / 2;
        const first = data.substring(0, len);
        const second = data.substring(len);

        const record: Record<string, boolean> = {};

        for (let i = 0; i < first.length; i++) {
          record[first[i]] = true;
        }

        for (let i = 0; i < second.length; i++) {
          if (record[second[i]]) return getItemPriority(second[i]);
        }

        throw new Error("No matches!");
      })
    );
  },
  () => {
    const rucksacks = readInputSplit(__dirname);
    const priorities: number[] = [];

    for (let i = 0; i < rucksacks.length; i += 3) {
      const record: Record<string, number> = {};

      for (let j = 0; j < rucksacks[i].length; j++) {
        record[rucksacks[i][j]] = 1;
      }

      for (let j = 0; j < rucksacks[i + 1].length; j++) {
        if (record[rucksacks[i + 1][j]] === 1) {
          record[rucksacks[i + 1][j]] = 2;
        }
      }

      for (let j = 0; j < rucksacks[i + 2].length; j++) {
        if (record[rucksacks[i + 2][j]] === 2) {
          priorities.push(getItemPriority(rucksacks[i + 2][j]));
          break;
        }
      }
    }

    return sumArray(priorities);
  },
]);
