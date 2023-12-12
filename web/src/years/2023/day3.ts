import { Day } from "../../core";
import { sumArray } from "../../utils";
import input from "./day3.txt?raw";

const day = new Day(3, input);

day.addPart(function (parser) {
  const input = parser.input();
  const matrix = input.map((row) => row.replace(/\d/g, ".").split(""));

  const adjacentToSymbol = (x: number, y: number) => {
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        const value = matrix[y + i]?.[x + j];
        if (value !== undefined && value !== ".") return true;
      }
    }

    return false;
  };

  const values: number[] = [];

  input.forEach((row, y) => {
    const regex = /\d+/g;
    let match: RegExpExecArray | null = null;

    while ((match = regex.exec(row)) != null) {
      const x = match.index;
      const value = match[0];

      for (let i = 0; i < value.length; i++) {
        const isAdjacent = adjacentToSymbol(x + i, y);
        if (isAdjacent) {
          values.push(Number.parseInt(value));
          break;
        }
      }
    }
  });

  return sumArray(values);
});

day.addPart(function (parser) {
  const input = parser.input();
  const matrix = input.map((row) => row.replace(/\d/g, ".").split(""));

  const adjacentToGear = (x: number, y: number) => {
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        const value = matrix[y + i]?.[x + j];
        if (value !== undefined && value === "*") {
          return `${x + j}-${y + i}`;
        }
      }
    }

    return false;
  };

  const gears: Record<string, number[]> = {};

  input.forEach((row, y) => {
    const regex = /\d+/g;
    let match: RegExpExecArray | null = null;

    while ((match = regex.exec(row)) != null) {
      const x = match.index;
      const value = match[0];

      for (let i = 0; i < value.length; i++) {
        const gear = adjacentToGear(x + i, y);
        if (gear) {
          if (!(gear in gears)) gears[gear] = [];
          gears[gear].push(Number.parseInt(value));
          break;
        }
      }
    }
  });

  let sum = 0;
  for (const key in gears) {
    if (Object.prototype.hasOwnProperty.call(gears, key)) {
      const values = gears[key];
      if (values.length !== 2) continue;

      sum += values[0] * values[1];
    }
  }

  return sum;
});

export default day;
