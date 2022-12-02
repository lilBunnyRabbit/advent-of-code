import fs from "fs";
import readline from "readline";

export interface Day extends Record<`part_${number}`, () => number | string | void> {
  name: `Day ${number}`;
}

export const readInput = (dirname: string): string => {
  try {
    return fs.readFileSync(`${dirname}/input.txt`, { encoding: "utf8" });
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const readInputSplit = (dirname: string, regex: string | RegExp = /\n/): string[] => {
  return readInput(dirname).split(regex);
};

export const readInputByLine = async (dirname: string, callback: (line: string, i: number) => any | Promise<any>) => {
  const input = fs.createReadStream(`${dirname}/input.txt`);

  const rl = readline.createInterface({ input, crlfDelay: Infinity });

  let index = 0;
  for await (const line of rl) await Promise.resolve(callback(line, index++));
};

export const printDay = (day: Day) => {
  const { name, ...parts } = day;

  const parsePartName = (part: string) => {
    part = part.toString();
    return part.charAt(0).toUpperCase() + part.slice(1).replace("_", " ");
  };

  const partsKeys: string[] = Object.keys(parts);
  if (partsKeys.length === 0) return console.log(`${name}: No parts!`);

  console.log(
    `${name}:\n` +
      partsKeys
        .sort((a, b) => a.localeCompare(b))
        .map((partName) => `- ${parsePartName(partName)}: ${(parts as any)[partName]()}`)
        .join("\n")
  );
};
