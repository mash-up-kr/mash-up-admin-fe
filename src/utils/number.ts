export const parseUrlParam = (param: string | undefined) => {
  if (param === undefined) {
    return -1;
  }

  return parseInt(param, 10);
};
