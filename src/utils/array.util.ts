import { asNumber } from "./type.util";

export const sumArray = (data: Array<string | number>): number => {
  return data.reduce((total: number, current) => total + asNumber(current), 0);
};

export const stringToNumbers = (data: string) => {
  return data.trim().split(/\s+/).map(asNumber);
};
