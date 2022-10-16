import { css, Theme } from '@emotion/react';
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

export const getScoreRangeType = (score: number) => {
  if (score < 0) {
    return RangeType.Minus;
  }

  if (score > 0) {
    return RangeType.Plus;
  }

  return RangeType.Normal;
};

export const getScoreTextColor = (type: ValueOf<typeof RangeType>, theme: Theme) => {
  let textColor = '';

  if (type === RangeType.Normal) {
    textColor = theme.colors.gray80;
  }

  if (type === RangeType.Minus) {
    textColor = theme.colors.red70;
  }

  if (type === RangeType.Plus) {
    textColor = theme.colors.blue70;
  }

  return css`
    color: ${textColor};
  `;
};
