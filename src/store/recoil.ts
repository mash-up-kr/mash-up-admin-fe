import { atom, RecoilValue, GetCallback, GetRecoilValue, selector, selectorFamily } from 'recoil';

interface SelectorWithRefresherParams<T> {
  key: string;
  get: (opts: { get: GetRecoilValue; getCallback: GetCallback }) => T | Promise<T> | RecoilValue<T>;
}

interface SelectorFamilyWithRefresherParams<T, P> {
  key: string;
  get: (
    param: P,
  ) => (opts: { get: GetRecoilValue; getCallback: GetCallback }) => T | Promise<T> | RecoilValue<T>;
}

export const selectorWithRefresher = <T>({
  key,
  get: callback,
}: SelectorWithRefresherParams<T>) => {
  const $requestId = atom<number>({
    key: `${key}RequestId`,
    default: 0,
  });

  return selector<T>({
    key,
    get: (selectorOptions) => {
      selectorOptions.get($requestId);
      return callback(selectorOptions);
    },
    set: ({ set }) => {
      set($requestId, (id) => id + 1);
    },
  });
};

export const selectorFamilyWithRefresher = <T, P extends { [key: string]: any }>({
  key,
  get: callback,
}: SelectorFamilyWithRefresherParams<T, P>) => {
  const $requestId = atom<number>({
    key: `${key}RequestId`,
    default: 0,
  });

  return selectorFamily<T, P>({
    key,
    get:
      (...params) =>
      (selectorOptions) => {
        selectorOptions.get($requestId);
        return callback(...params)(selectorOptions);
      },
    set:
      () =>
      ({ set }) => {
        set($requestId, (id) => id + 1);
      },
  });
};
