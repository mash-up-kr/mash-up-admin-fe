export const parseUrlParam = (param: string | null | undefined) => {
  if (param === null || param === undefined) {
    return undefined;
  }

  return parseInt(param, 10);
};
