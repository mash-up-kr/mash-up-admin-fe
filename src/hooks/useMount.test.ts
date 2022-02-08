import { renderHook } from '@testing-library/react-hooks';
import { useMount } from '@/hooks';

describe('useMount', () => {
  it('인자로 받은 함수는 mount 될 때 한 번만 실행되어야 한다.', () => {
    // Given
    const fn = jest.fn();

    // When
    renderHook(() => useMount(fn));

    // Then
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('인자로 받은 함수는 unmount 될 때 실행되지 않아야 한다.', () => {
    // Given
    const fn = jest.fn();

    // When, Then
    const { unmount } = renderHook(() => useMount(fn));
    expect(fn).toHaveBeenCalledTimes(1);

    // When, Then
    unmount();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('인자로 받은 함수는 rerender 될 때도 실행되지 않아야 한다.', () => {
    // Given
    const fn = jest.fn();

    // When, Then
    const { rerender } = renderHook(() => useMount(fn));
    expect(fn).toHaveBeenCalledTimes(1);

    // When, Then
    rerender();
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
