export const isString = (value: any): value is string => {
  return typeof value === "string";
};

export const sumArray = (data: Array<string | number>): number => {
  return data.reduce((total: number, current) => {
    const value = isString(current) ? Number.parseFloat(current) : current;
    return total + value;
  }, 0);
};
