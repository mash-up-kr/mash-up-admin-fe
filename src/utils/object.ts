import { NestedKeyOf } from '@/types';

export const getOwnValueByKey = <T extends object>(object: T, path: NestedKeyOf<T>) => {
  const keys = path.split('.');

  return keys.reduce((result: any, key) => {
    return result[key];
  }, object);
};
