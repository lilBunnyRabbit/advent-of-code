import fs from "fs";
import readline from "readline";
import path from "path";

export const readInput = (dirname: string): string => {
  try {
    return fs.readFileSync(`${dirname}/input.txt`, { encoding: "utf8" });
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const readInputByLine = async (dirname: string, callback: (line: string, i: number) => any | Promise<any>) => {
  const input = fs.createReadStream(`${dirname}/input.txt`);

  const rl = readline.createInterface({ input, crlfDelay: Infinity });

  let index = 0;
  for await (const line of rl) await Promise.resolve(callback(line, index++));
};

type PartFunctionReturnType = string | number;
type PartFunction = (this: Day) => PartFunctionReturnType | Promise<PartFunctionReturnType>;

export class Day {
  private parts: PartFunction[] = [];

  constructor(private filename: string, private name: string) {
    if (filename.includes("build")) {
      this.filename = filename.replace("build", "src");
    }
  }

  getInput(regex?: string | RegExp): string[];
  getInput(regex: null): string;
  /**
   * Read input from __dirname/input.txt.
   * If regex !== null it splits the string.
   *
   * @param {(string | RegExp | null)} [regex=/\n/]
   * @return {*}  {(string | string[])}
   * @memberof Day
   */
  getInput(regex: string | RegExp | null = /\n/): string | string[] {
    const input = readInput(path.join(this.filename, "../"));
    if (!regex) return input;
    return input.split(regex);
  }

  /**
   * Read and split input.
   *
   * @see {@link getInput}
   * @readonly
   * @memberof Day
   */
  get input() {
    return this.getInput();
  }

  addPart(part: PartFunction): this {
    this.parts.push(part);
    return this;
  }

  async getResults(): Promise<PartFunctionReturnType[]> {
    return await Promise.all(this.parts.map(async (part) => await Promise.resolve(part.bind(this)())));
  }

  async getOutput(): Promise<string> {
    if (this.parts.length === 0) {
      return `${this.name}: No parts!`;
    }

    const results = await this.getResults();
    return `${this.name}:\n${results.map((result, i) => `- Part ${i + 1}: ${result}`).join("\n")}`;
  }

  async execute() {
    if (this.parts.length === 0) {
      return console.log(`${this.name}: No parts!`);
    }

    console.log(`${this.name}:`);
    await Promise.all(
      this.parts.map(async (part, i) => {
        const result = await Promise.resolve(part.bind(this)());
        return console.log(`- Part ${i + 1}: ${result}`);
      })
    );
  }
}
