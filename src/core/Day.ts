import { InputParser } from "./InputParser";

export type PartResult = string | number;
export type PartCallback = (inputParser: InputParser) => PartResult | Promise<PartResult>;

export interface PartConfig {
  autoStart?: boolean;
}

export enum Flag {
  AUTO_START,
}

export class Part {
  constructor(
    readonly day: Day,
    readonly value: number,
    readonly callback: PartCallback,
    readonly flags: Set<Flag> = new Set()
  ) {}

  public async execute(input?: string): Promise<PartResult> {
    return await Promise.resolve(this.callback(new InputParser(input || this.day.input)));
  }
}

export class Day {
  private _year: Year | null = null;
  readonly parts: Part[] = [];

  readonly flags: Set<Flag>;

  constructor(readonly value: number, readonly input: string, flags?: Flag | Flag[]) {
    this.flags = new Set(flags === undefined ? undefined : Array.isArray(flags) ? flags : [flags]);
  }

  public get year() {
    return this._year;
  }

  public addPart(callback: PartCallback, flags?: Flag | Flag[]) {
    this.parts.push(
      new Part(
        this,
        this.parts.length + 1,
        callback,
        new Set([...this.flags, ...(flags === undefined ? [] : Array.isArray(flags) ? flags : [flags])])
      )
    );

    return this;
  }

  /**
   * A helper function that is excatly the same as `addPart` except it doesn't save the part.
   */
  public addPart__DISABLED(..._: Parameters<typeof this.addPart>) {
    return this;
  }

  public bindYear(year: Year) {
    this._year = year;

    return this;
  }
}

export class Year {
  constructor(readonly value: number, readonly days: Day[]) {
    days.map((day) => day.bindYear(this));
  }
}
