export const rangeArray = (length: number) => {
  return [...Array(length)].map((_, index) => index + 1);
};

export const uniqArray = <T>(arr: T[]) => [...new Set(arr)];
