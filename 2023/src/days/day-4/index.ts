import { sumArray } from "../../tools";
import { Day } from "../../utils";

export default new Day(__filename, "Day 4")
  .addPart(function () {
    const out: number[] = this.getInput().map((row) => {
      const groups = /^Card\s+(?<card>\d+):\s+(?<winning>.*)\s+\|\s+(?<numbers>.*)\s*$/g.exec(row)?.groups!;

      const winning = groups.winning
        .trim()
        .split(/\s+/g)
        .map((v) => Number.parseInt(v));
      const numbers = groups.numbers
        .trim()
        .split(/\s+/g)
        .map((v) => Number.parseInt(v));

      const matched = numbers.filter((v) => winning.includes(v));

      return matched.length > 0
        ? Array(Math.max(matched.length - 1, 0))
            .fill(0)
            .reduce((p, c) => p + p, 1)
        : 0;
    });

    return sumArray(out);
  })
  .addPart(function () {
    const instances: Record<number, number> = {};

    this.getInput().forEach((row) => {
      const groups = /^Card\s+(?<card>\d+):\s+(?<winning>.*)\s+\|\s+(?<numbers>.*)\s*$/g.exec(row)?.groups!;

      const index = Number.parseInt(groups.card) - 1;

      const winning = groups.winning
        .trim()
        .split(/\s+/g)
        .map((v) => Number.parseInt(v));
      const numbers = groups.numbers
        .trim()
        .split(/\s+/g)
        .map((v) => Number.parseInt(v));

      const matches = numbers.filter((v) => winning.includes(v));

      if (!(index in instances)) instances[index] = 1;
      const cardMultiplier = instances[index];
      for (let match = 1; match < matches.length + 1; match++) {
        const instanceIndex = index + match;
        if (!(instanceIndex in instances)) instances[instanceIndex] = 1 + cardMultiplier;
        else instances[instanceIndex] += cardMultiplier;
      }
    });

    return sumArray(Object.keys(instances).map((key) => instances[key as unknown as keyof typeof instances]));
  });
