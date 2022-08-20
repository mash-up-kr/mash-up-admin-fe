import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import useHistory from './useHistory';

const mockNavigate = jest.fn();

const mockUseLocation = jest.fn().mockImplementation(() => ({ state: {} }));

jest.mock('react-router-dom', () => ({
  useLocation: () => mockUseLocation(),
  useNavigate: jest.fn().mockImplementation(() => mockNavigate),
}));

describe('useHistory', () => {
  it('from 값이 존재한다면 뒤로가기 클릭 시 from으로 이동한다', () => {
    // Given
    const from = 'from';
    mockUseLocation.mockReturnValueOnce({
      state: {
        from,
      },
    });

    // When
    const { result } = renderHook(() => useHistory());
    act(() => result.current.handleGoBack());

    // Then
    expect(mockNavigate).toBeCalledWith(from);
  });

  it('from 값이 존재하지 않고 defaultPath가 있다면 defaultPath로 이동한다', () => {
    // Given
    const defaultPath = 'default-path';

    // When
    const { result } = renderHook(() => useHistory());
    act(() => result.current.handleGoBack(defaultPath));

    // Then
    expect(mockNavigate).toBeCalledWith(defaultPath);
  });

  it('from 값과 defaultPath값 모두 존재하지 않는다면 뒤로 이동한다', () => {
    // Given

    // When
    const { result } = renderHook(() => useHistory());
    act(() => result.current.handleGoBack());

    // Then
    expect(mockNavigate).toBeCalledWith(-1);
  });

  it('clearQueryString값이 false라면 from값에 쿼리스트링도 함께 저장된다.', () => {
    // Given
    const from = '/from';
    const queryString = '?queryString=queryString';
    const fromWithQueryString = `${from}${queryString}`;
    const to = '/to';

    mockUseLocation.mockReturnValueOnce({
      pathname: from,
      search: queryString,
    });

    // When
    const { result } = renderHook(() => useHistory(false));
    act(() => result.current.handleNavigate(to));

    // Then

    expect(mockNavigate).toBeCalledWith(to, { state: { from: fromWithQueryString } });
  });
});
