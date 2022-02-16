import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import PageButtonList from './PageButtonList.component';
import { theme } from '@/styles';

interface Params {
  currentPage: number;
  startPage: number;
  endPage: number;
  totalPages: number;
}
export const renderPageButtonList = ({ currentPage, startPage, endPage, totalPages }: Params) => {
  const handleChangePage = jest.fn();

  const {
    container: { firstChild },
  } = render(
    <ThemeProvider theme={theme}>
      <PageButtonList
        currentPage={currentPage}
        startPage={startPage}
        endPage={endPage}
        totalPages={totalPages}
        handleChangePage={handleChangePage}
      />
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
