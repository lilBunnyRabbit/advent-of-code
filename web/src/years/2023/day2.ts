import { Day } from "../../core";
import { sumArray } from "../../utils";
import input from "./day2.txt?raw";

const day = new Day(2, input);

day.addPart(function (parser) {
  const max = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const out: number[] = parser.input().map((row) => {
    const { game, subsets } = /^Game\s*(?<game>\d+):\s*(?<subsets>.*)\s*$/g.exec(row)?.groups!;

    const isPossible = !!subsets?.match(/\d+\s+\w*/g)?.every((v) => {
      const [strAmount, type] = v.split(/\s+/);
      const amount = Number.parseInt(strAmount);

      return amount <= max[type as keyof typeof max];
    });

    return isPossible ? Number.parseInt(game) : 0;
  });

  return sumArray(out);
});

day.addPart(function (parser) {
  const out: number[] = parser.input().map((row) => {
    const { subsets } = /^Game\s*\d+:\s*(?<subsets>.*)\s*$/g.exec(row)?.groups!;

    const min = {
      red: 0,
      green: 0,
      blue: 0,
    };

    subsets?.match(/\d+\s+\w*/g)?.forEach((v) => {
      const split = v.split(/\s+/);
      const amount = Number.parseInt(split[0]);
      const type = split[1] as keyof typeof min;

      min[type] = Math.max(min[type], amount);
    });

    return min.red * min.green * min.blue;
  });

  return sumArray(out);
});

export default day;
