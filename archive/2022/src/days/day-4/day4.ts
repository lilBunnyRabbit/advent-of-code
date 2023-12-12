import { Day } from "../../utils";

const parseSections = (data: string): [number[], number[]] => {
  return data.split(",").map((section) => section.split("-").map((v) => Number.parseInt(v))) as [number[], number[]];
};

const firstFullyContains = (first: number[], second: number[]): boolean => {
  return first[0] <= second[0] && first[1] >= second[1];
};

const fullyContains = (first: number[], second: number[]): boolean => {
  return firstFullyContains(first, second) || firstFullyContains(second, first);
};

const overlaps = (first: number[], second: number[]): boolean => {
  if (first[0] <= second[0] && first[1] >= second[0]) return true;
  if (fullyContains(first, second)) return true;
  if (first[0] <= second[1] && first[1] >= second[1]) return true;
  return false;
};

export default new Day(__filename)
  .addPart(function () {
    return this.input.reduce((count, data) => {
      return count + (fullyContains(...parseSections(data)) ? 1 : 0);
    }, 0);
  })
  .addPart(function () {
    return this.input.reduce((count, data) => {
      return count + (overlaps(...parseSections(data)) ? 1 : 0);
    }, 0);
  });
