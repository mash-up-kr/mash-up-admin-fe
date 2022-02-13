import React from 'react';
import ChevronLeft from '@/assets/svg/chevron-left-24.svg';
import ChevronDoubleLeft from '@/assets/svg/chevrondouble-left-24.svg';
import ChevronRight from '@/assets/svg/chevron-right-24.svg';
import ChevronDoubleRight from '@/assets/svg/chevrondouble-right-24.svg';
import { FIRST_PAGE } from '../Pagination.component';
import * as Styled from './PageButtonList.styled';

interface Props {
  currentPage: number;
  startPage: number;
  endPage: number;
  totalPages: number;
  handleChangePage: (page: number) => (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const PageButtonList = ({
  currentPage,
  startPage,
  endPage,
  totalPages,
  handleChangePage,
}: Props) => {
  const prevPage = startPage <= FIRST_PAGE ? 0 : startPage - 1;
  const nextPage = endPage >= totalPages ? 0 : endPage + 1;
  const pages = [...Array(endPage - startPage + 1).keys()].map((diff) => startPage + diff);

  if (currentPage === 0) {
    return null;
  }

  return (
    <>
      <Styled.ArrowButton
        role="link"
        aria-label="First page"
        disabled={currentPage === FIRST_PAGE}
        onClick={handleChangePage(FIRST_PAGE)}
      >
        <ChevronDoubleLeft />
      </Styled.ArrowButton>
      <Styled.ArrowButton
        role="link"
        aria-label="Previous page"
        disabled={startPage === FIRST_PAGE}
        onClick={handleChangePage(prevPage)}
      >
        <ChevronLeft />
      </Styled.ArrowButton>
      <Styled.OrderedList>
        {pages.map((page) => {
          const isActive = page === currentPage;
          return (
            <li key={`page${page}`}>
              <Styled.PageButton
                role="link"
                aria-label={`Page ${page}`}
                aria-current={isActive && 'page'}
                disabled={isActive}
                onClick={handleChangePage(page)}
              >
                {page}
              </Styled.PageButton>
            </li>
          );
        })}
      </Styled.OrderedList>
      <Styled.ArrowButton
        role="link"
        aria-label="Next page"
        disabled={endPage === totalPages}
        onClick={handleChangePage(nextPage)}
      >
        <ChevronRight />
      </Styled.ArrowButton>
      <Styled.ArrowButton
        role="link"
        aria-label="Last page"
        disabled={currentPage === totalPages}
        onClick={handleChangePage(totalPages)}
      >
        <ChevronDoubleRight />
      </Styled.ArrowButton>
    </>
  );
};

export default PageButtonList;
