import { SORT_TYPE } from '@/constants';
import { ValueOf } from '@/types';

export const sortString = (type: ValueOf<typeof SORT_TYPE>, one: string, another: string) => {
  const compared = one < another;

  if (type === SORT_TYPE.ASC) {
    return compared ? -1 : 1;
  }

  return compared ? 1 : -1;
};

export const parsePlaceholderWhenEmpty = (value: string | null | undefined, parsingText = '-') => {
  if (!value) {
    return parsingText;
  }

  return value;
};

export const parsePlaceholderWhenInvalidDate = (
  value: string | null | undefined,
  parsingText = '-',
) => {
  if (!value || value === 'Invalid Date') {
    return parsingText;
  }

  return value;
};

export const decodeHTMLEntities = (value: string) => {
  const element = document.createElement('div');
  element.innerHTML = value;
  element.remove();
  return element.textContent ?? '';
};
