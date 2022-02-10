export const neverExpected = (value: never) => {
  throw new Error(`Unexpected value : ${value}`);
};
