export class InputParser {
  constructor(readonly rawInput: string) {}

  public input(regex?: string | RegExp | number): string[];
  public input(regex: null): string;
  public input(regex: string | RegExp | null | number = /\r?\n/): string | string[] {
    if (regex === null) return this.rawInput;

    const regexp = typeof regex === "number" ? new RegExp("\r?\n".repeat(regex)) : regex;

    return this.rawInput.split(regexp);
  }
}
