import fs from "fs";
import readline from "readline";

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

export const Day = (day: number, parts: Array<() => any | Promise<any>>) => {
  return async () => {
    if (parts.length === 0) {
      return console.log(`Day ${day}: No parts!`);
    }

    console.log(`Day ${day}:`);
    await Promise.all(
      parts.map(async (part, i) => {
        const result = await Promise.resolve(part());
        return console.log(`- Part ${i + 1}: ${result}`);
      })
    );
  };
};
