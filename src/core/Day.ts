import { InputParser } from "./InputParser";

export type PartResult = string | number;
export type PartCallback = (inputParser: InputParser) => PartResult | Promise<PartResult>;

export interface PartConfig {
  autoStart?: boolean;
}

export class Part {
  constructor(
    readonly day: Day,
    readonly value: number,
    readonly callback: PartCallback,
    readonly config?: PartConfig
  ) {}

  public async execute(input?: string): Promise<PartResult> {
    return await Promise.resolve(this.callback(new InputParser(input || this.day.input)));
  }
}

export class Day {
  private _year: Year | null = null;
  readonly parts: Part[] = [];

  constructor(readonly value: number, readonly input: string, readonly config?: PartConfig) {}

  public get year() {
    return this._year;
  }

  public addPart(callback: PartCallback, config?: PartConfig) {
    this.parts.push(new Part(this, this.parts.length + 1, callback, { ...this.config, ...config }));

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
