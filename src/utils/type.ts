export const isObject = (obj: unknown) => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

export const isArray = (array: unknown) => {
  return Object.prototype.toString.call(array) === '[object Array]';
};
