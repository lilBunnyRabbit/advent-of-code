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

export const printDay = async (day: Day) => {
  const { name, ...parts } = day;

  const getPartResult = async (partName: string) => {
    const result = await Promise.resolve((parts as any)[partName]());
    partName = partName.toString();
    return `- ${partName.charAt(0).toUpperCase() + partName.slice(1).replace("_", " ")}: ${result}`;
  };

  const keys: string[] = Object.keys(parts);
  if (keys.length === 0) return console.log(`${name}: No parts!`);

  const results = await Promise.all(keys.map(getPartResult)).then((p) =>
    p.sort((a, b) => a.localeCompare(b)).join("\n")
  );

  console.log(`${name}:\n${results}`);
};
