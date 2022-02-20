import { getOwnValueByKey } from './object';

describe('getOwnValueByKey', () => {
  it('object의 key 값에 해당하는 value 값을 반환한다', () => {
    // Given
    const object = { a: 1, b: 2 };

    // When, Then
    expect(getOwnValueByKey(object, 'a')).toBe(1);
    expect(getOwnValueByKey(object, 'b')).toBe(2);
  });

  it('object가 중첩되어 있더라도, 해당 depth에 위치한 value 값을 반환한다', () => {
    // Given
    const object = { a: { b: { c: 'hello' } } };

    // When
    const result = getOwnValueByKey(object, 'a.b.c');

    // Then
    expect(result).toBe('hello');
  });
});
