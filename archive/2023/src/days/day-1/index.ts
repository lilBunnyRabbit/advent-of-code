import { sumArray } from "../../tools";
import { Day } from "../../utils";

export default new Day(__filename, "Day 1")
  .addPart(function () {
    return sumArray(
      this.getInput().map((row) => {
        const numbers = row.replace(/[^\d]/g, "").trim().split("");

        return Number.parseInt(numbers[0] + numbers[numbers.length - 1]);
      })
    );
  })
  .addPart(function () {
    const stringNumbers = {
      one: "1",
      two: "2",
      three: "3",
      four: "4",
      five: "5",
      six: "6",
      seven: "7",
      eight: "8",
      nine: "9",
    };

    const findAll = (row: string, pattern: string | RegExp) => {
      const regex = new RegExp(pattern, "g");
      let match: RegExpExecArray | null = null;

      let indexes: { index: number; value: string }[] = [];

      while ((match = regex.exec(row)) != null) {
        indexes.push({ index: match.index, value: match[0] });
      }

      return indexes;
    };

    return sumArray(
      this.getInput().map((row) => {
        const stringMatches: { index: number; value: string }[] = Object.keys(stringNumbers).flatMap((key) => {
          const indexes = findAll(row, key);
          return indexes.map(({ index }) => ({ index, value: stringNumbers[key as keyof typeof stringNumbers] }));
        });

        const numberMatches: { index: number; value: string }[] = findAll(row, /\d/);

        const matches = [...stringMatches, ...numberMatches].sort((a, b) => {
          if (a.index < b.index) return -1;
          if (a.index > b.index) return 1;
          return 0;
        });

        return Number.parseInt(matches[0].value + matches[matches.length - 1].value);
      })
    );
  });
