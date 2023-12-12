export type CssClass = string;

export function classNames<T extends Array<CssClass | false | null | undefined>>(...classes: T): CssClass {
  return classes.filter(Boolean).join(" ");
}

export const cx = classNames;