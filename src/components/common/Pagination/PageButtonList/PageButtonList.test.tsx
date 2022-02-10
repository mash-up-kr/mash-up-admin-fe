import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { PageOptions } from '../Pagination.component';
import PageButtonList from './PageButtonList.component';
import { theme } from '@/styles';

const renderPageButtonList = (pageOptions: PageOptions) => {
  const handleChangePage = jest.fn();

  const {
    container: { firstChild },
  } = render(
    <ThemeProvider theme={theme}>
      <PageButtonList pageOptions={pageOptions} handleClickPage={handleChangePage} />
    </ThemeProvider>,
  );

  const FirstButton = () => screen.getByLabelText('First page');
  const PrevButton = () => screen.getByLabelText('Previous page');
  const NextButton = () => screen.getByLabelText('Next page');
  const LastButton = () => screen.getByLabelText('Last page');
  const PageButtons = () => screen.getAllByLabelText(/Page \d+/);
  const CurrentPage = () => screen.getByRole('button', { current: 'page' }).textContent;

  const clickFirstButton = () => {
    userEvent.click(FirstButton());
  };
  const clickPrevButton = () => {
    userEvent.click(PrevButton());
  };
  const clickNextButton = () => {
    userEvent.click(NextButton());
  };
  const clickLastButton = () => {
    userEvent.click(LastButton());
  };
  const clickPageButton = () => {
    userEvent.click(PageButtons()[3]);
  };

  return {
    firstChild,
    FirstButton,
    PrevButton,
    NextButton,
    LastButton,
    PageButtons,
    CurrentPage,
    clickFirstButton,
    clickPrevButton,
    clickNextButton,
    clickLastButton,
    clickPageButton,
  };
};

describe('<PageButtonList />', () => {
  it('페이지가 없는 경우, 렌더링 되어서는 안된다.', () => {
    // Given, When
    const { firstChild } = renderPageButtonList({
      currentPage: 0,
      pagingSize: 0,
      startPage: 0,
      endPage: 0,
      totalPages: 0,
    });

    // Then
    expect(firstChild).not.toBeInTheDocument();
  });

  it('기본 필드가 렌더링 되어야 한다.', () => {
    // Given, When
    const { FirstButton, PrevButton, NextButton, LastButton, PageButtons } = renderPageButtonList({
      currentPage: 5,
      pagingSize: 20,
      startPage: 1,
      endPage: 10,
      totalPages: 10,
    });

    // Then
    expect(FirstButton()).toBeInTheDocument();
    expect(PrevButton()).toBeInTheDocument();
    expect(NextButton()).toBeInTheDocument();
    expect(LastButton()).toBeInTheDocument();

    PageButtons().forEach((PageButton) => {
      expect(PageButton).toBeInTheDocument();
    });
  });

  it('페이지가 10개보다 작을 경우, 그만큼의 페이지 버튼이 렌더링 되어야 한다.', () => {
    // Given, When
    const { PageButtons } = renderPageButtonList({
      currentPage: 5,
      pagingSize: 20,
      startPage: 1,
      endPage: 7,
      totalPages: 7,
    });

    // Then
    expect(PageButtons()).toHaveLength(7);
  });

  it('페이지가 10개보다 많을 경우, 10개의 페이지 버튼만 렌더링 되어야 한다.', () => {
    // Given, When
    const { PageButtons } = renderPageButtonList({
      currentPage: 15,
      pagingSize: 20,
      startPage: 11,
      endPage: 20,
      totalPages: 27,
    });

    // Then
    expect(PageButtons()).toHaveLength(10);
  });

  it('첫 페이지인 경우, 처음 버튼은 비활성화 되어야 한다.', () => {
    // Given, When
    const { FirstButton } = renderPageButtonList({
      currentPage: 1,
      pagingSize: 20,
      startPage: 1,
      endPage: 7,
      totalPages: 7,
    });

    // Then
    expect(FirstButton()).toBeDisabled();
  });

  it('첫 페이지와 현재 페이지가 같이 보일 경우, 이전 버튼은 비활성화 되어야 한다.', () => {
    // Given, When
    const { PrevButton } = renderPageButtonList({
      currentPage: 5,
      pagingSize: 20,
      startPage: 1,
      endPage: 7,
      totalPages: 7,
    });

    // Then
    expect(PrevButton()).toBeDisabled();
  });

  it('마지막 페이지와 현재 페이지가 같이 보일 경우, 다음 버튼은 비활성화 되어야 한다.', () => {
    // Given, When
    const { NextButton } = renderPageButtonList({
      currentPage: 15,
      pagingSize: 20,
      startPage: 10,
      endPage: 17,
      totalPages: 17,
    });

    // Then
    expect(NextButton()).toBeDisabled();
  });

  it('마지막 페이지인 경우, 마지막 버튼은 비활성화 되어야 한다.', () => {
    // Given, When
    const { LastButton } = renderPageButtonList({
      currentPage: 17,
      pagingSize: 20,
      startPage: 10,
      endPage: 17,
      totalPages: 17,
    });

    // Then
    expect(LastButton()).toBeDisabled();
  });

  // eslint-disable-next-line jest/no-commented-out-tests
  /*
   * 아래와 같이 User Event 관점에서 컴포넌트에 발생할 수 있는 Event 전/후를 테스트해야 하지만,
   * PageButtonList 컴포넌트의 경우는 테스트하지 않는 것이 맞는 것 같으므로 패스한다.
   * PageButtonList 컴포넌트의 경우 페이지 버튼이 클릭되었을 때 DOM에 반영된 CurrentPage가 잘 변경되는지 테스트해야 하지만,
   * CurrentPage를 변경시키는 handleChangePage를 부모 컴포넌트로부터 받기 때문에
   * PageButtonList 컴포넌트는 페이지 버튼이 클릭되었을 때 정확히 무슨 행위를 할 지 모르기 때문이다.
   *
  it('처음 버튼이 클릭되면, 처음 페이지로 이동해야 한다.', () => {
    // Given
    const { CurrentPage, clickFirstButton } = renderPageButtonList({
      currentPage: 17,
      pagingSize: 20,
      startPage: 10,
      endPage: 17,
      totalPages: 17,
    });

    // When
    expect(CurrentPage()).toBe('17');
    clickFirstButton();

    // Then
    expect(CurrentPage()).toBe('1');
  });
  it('이전 버튼이 클릭되면, 이전 페이지 리스트의 마지막 페이지로 이동해야 한다.', () => {});
  it('다음 버튼이 클릭되면, 다음 페이지 리스트의 첫 페이지로 이동해야 한다.', () => {});
  it('마지막 버튼이 클릭되면, 마지막 페이지로 이동해야 한다.', () => {});
  it('페이지 버튼이 클릭되면, 해당 페이지로 이동해야 한다.', () => {});
  */
});
