export const rangeArray = (length: number) => {
  return [...Array(length)].map((_, index) => index + 1);
};
