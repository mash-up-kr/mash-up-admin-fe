import { SORT_TYPE } from '@/constants';
import { ValueOf } from '@/types';

export const sortString = (type: ValueOf<typeof SORT_TYPE>, one: string, another: string) => {
  const compared = one < another;

  if (type === SORT_TYPE.ASC) {
    return compared ? -1 : 1;
  }

  return compared ? 1 : -1;
};
