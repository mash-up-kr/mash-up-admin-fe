import { NestedKeyOf } from '@/types';
import { isObject, isArray } from './type';

export const getOwnValueByKey = <T extends object>(object: T, path: NestedKeyOf<T>) => {
  const keys = path.split('.');

  return keys.reduce((result: any, key) => {
    return result[key];
  }, object);
};

export function isSameObject(one: Record<string, any>, another: Record<string, any>): boolean {
  const keysOfOne = Object.keys(one);
  const keysOfAnother = Object.keys(another);

  return (
    keysOfOne.length === keysOfAnother.length &&
    keysOfOne.every((key) => {
      if (
        isObject(one[key]) ||
        isObject(another[key]) ||
        isArray(one[key]) ||
        isArray(another[key])
      ) {
        return isSameObject(one[key], another[key]);
      }
      return one[key] === another[key];
    })
  );
}
