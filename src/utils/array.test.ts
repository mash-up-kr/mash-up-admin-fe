import { rangeArray } from './array';

describe('rangeArray', () => {
  it('인자로 받은 길이만큼의 배열을 반환하며, 배열은 1부터 1씩 증가하는 숫자들로 구성된다.', () => {
    // Given, When, Then
    expect(rangeArray(0)).toEqual([]);
    expect(rangeArray(5)).toEqual([1, 2, 3, 4, 5]);
  });
});
