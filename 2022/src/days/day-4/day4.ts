import { Day, readInputSplit } from "../../utils";

const parseSections = (data: string): [number[], number[]] => {
  return data.split(",").map((section) => section.split("-").map((v) => Number.parseInt(v))) as [number[], number[]];
};

const firstFullyContainsSecond = (first: number[], second: number[]): boolean => {
  return first[0] <= second[0] && first[1] >= second[1];
};

const fullyContains = (first: number[], second: number[]): boolean => {
  return firstFullyContainsSecond(first, second) || firstFullyContainsSecond(second, first);
};

const overlaps = (first: number[], second: number[]): boolean => {
  if (first[0] <= second[0] && first[1] >= second[0]) return true;
  if (fullyContains(first, second)) return true;
  if (first[0] <= second[1] && first[1] >= second[1]) return true;
  return false;
};

export default Day(4, [
  () => {
    return readInputSplit(__dirname).reduce((count, data) => {
      return count + (fullyContains(...parseSections(data)) ? 1 : 0);
    }, 0);
  },
  () => {
    return readInputSplit(__dirname).reduce((count, data) => {
      return count + (overlaps(...parseSections(data)) ? 1 : 0);
    }, 0);
  },
]);
