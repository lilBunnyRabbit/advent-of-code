export const isString = (value: any): value is string => {
  return typeof value === "string";
};

export const asNumber = (value: string | number): number => {
  return isString(value) ? Number.parseFloat(value) : value;
};

export const sumArray = (data: Array<string | number>): number => {
  return data.reduce((total: number, current) => total + asNumber(current), 0);
};
