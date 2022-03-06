import { renderHook } from '@testing-library/react-hooks';
import { act } from '@testing-library/react';
import usePagination from '@/hooks/usePagination';

// usePagination 내부에서 사용하는 useSearchParams 모킹
const mockSearchParams = { get: jest.fn(), set: jest.fn() };
const mockSetSearchParams = jest.fn();
jest.mock('react-router-dom', () => {
  return {
    useSearchParams: jest.fn().mockImplementation(() => [mockSearchParams, mockSetSearchParams]),
    Link: 'Link',
  };
});

describe('usePagination', () => {
  it('아이템의 수가 없는 경우, 속성값들은 전부 0으로 초기화된다.', () => {
    // Given
    const totalCount = 0;

    // When
    const { result } = renderHook(() => usePagination(totalCount));
    const { pageOptions } = result.current;

    // Then
    expect(pageOptions).toEqual({
      currentPage: 0,
      endPage: 0,
      pagingSize: 0,
      startPage: 0,
      totalPages: 0,
    });
  });

  it('아이템의 수가 한 페이지에 표시되는 경우, 현재/시작/끝/전체 페이지는 전부 1이어야 한다.', () => {
    // Given
    const totalCount = 10;

    // When
    const { result } = renderHook(() => usePagination(totalCount));
    const { pageOptions } = result.current;

    // Then
    expect(pageOptions).toEqual({
      currentPage: 1,
      endPage: 1,
      pagingSize: 20,
      startPage: 1,
      totalPages: 1,
    });
  });

  it('아이템의 수가 충분히 많은 경우, 시작~끝 페이지 구간은 10이어야 한다.', () => {
    // Given
    const totalCount = 550;

    // When
    const { result } = renderHook(() => usePagination(totalCount));
    const { pageOptions } = result.current;

    // Then
    expect(pageOptions).toEqual({
      currentPage: 1,
      endPage: 10,
      pagingSize: 20,
      startPage: 1,
      totalPages: 28,
    });
  });

  it('query string에 page/size 정보가 있을 경우, 현재 페이지와 페이징 크기는 해당 값으로 설정되어야 한다.', () => {
    // Given
    const totalCount = 1330;
    const page = 13;
    const size = 50;
    mockSearchParams.get.mockReturnValueOnce(page).mockReturnValueOnce(size);

    // When
    const { result } = renderHook(() => usePagination(totalCount));
    const { pageOptions } = result.current;

    // Then
    expect(pageOptions).toEqual({
      currentPage: 13,
      endPage: 20,
      pagingSize: 50,
      startPage: 11,
      totalPages: 27,
    });
  });

  it('속성값과 함께 반환되는 함수로 page/size에 대한 query string을 변경할 수 있어야 한다.', async () => {
    // Given
    const totalCount = 550;

    // When, Then
    const { result } = renderHook(() => usePagination(totalCount));
    const { pageOptions, handleChangePage } = result.current;

    expect(pageOptions).toEqual({
      currentPage: 1,
      endPage: 10,
      pagingSize: 20,
      startPage: 1,
      totalPages: 28,
    });

    // When, Then
    act(() => handleChangePage(13));
    expect(mockSearchParams.set).toHaveBeenCalledWith('page', '13');
  });
});
