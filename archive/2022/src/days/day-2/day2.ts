import { sumArray } from "../../tools";
import { Day } from "../../utils";

const dataToIndex = (data: string): [number, number] => {
  return data.split(" ").map((shape) => {
    switch (shape) {
      case "A":
      case "X":
        return 0;
      case "B":
      case "Y":
        return 1;
      case "C":
      case "Z":
        return 2;
    }
  }) as [number, number];
};

// R P S
const rps = [
  [3, 6, 0], // R
  [0, 3, 6], // P
  [6, 0, 3], // S
];

export default new Day(__filename)
  .addPart(function () {
    return this.input.reduce((sum, data) => {
      const [f, s] = dataToIndex(data);
      return sum + rps[f][s] + s + 1;
    }, 0);
  })
  .addPart(function () {
    return this.input.reduce((sum, data) => {
      const [f, s] = dataToIndex(data);
      if (s === 0) return sum + rps[f].findIndex((i) => i === 0) + 1;
      if (s === 2) return sum + rps[f].findIndex((i) => i === 6) + 6 + 1;
      return sum + 3 + f + 1;
    }, 0);
  });
