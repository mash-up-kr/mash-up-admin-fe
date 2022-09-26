import { ValueOf } from '@/types';

import { RangeType } from './constants';

export const getRangeText = (range: number, rangeType: ValueOf<typeof RangeType>) => {
  if (rangeType === RangeType.Plus) {
    return `+${range}`;
  }

  if (rangeType === RangeType.Minus) {
    return `-${range}`;
  }

  return range;
};
