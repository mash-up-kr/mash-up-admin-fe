export const parseUrlParam = (param: string | null | undefined) => {
  if (param === null || param === undefined) {
    return 0;
  }

  return parseInt(param, 10);
};
