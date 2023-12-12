import { asNumber } from "./type.util";

export const sumArray = (data: Array<string | number>): number => {
  return data.reduce((total: number, current) => total + asNumber(current), 0);
};
