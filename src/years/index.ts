import { Year } from "../core";

import * as Days2023 from "./2023";

export const Year2023 = new Year(
  2023,
  Object.keys(Days2023).map((key) => Days2023[key as keyof typeof Days2023])
);
