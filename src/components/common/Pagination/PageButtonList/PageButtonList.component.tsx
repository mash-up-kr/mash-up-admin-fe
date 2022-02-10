import React from 'react';
import ChevronLeft from '@/assets/svg/chevron-left.svg';
import ChevronDoubleLeft from '@/assets/svg/chevrondouble-left.svg';
import ChevronRight from '@/assets/svg/chevron-right.svg';
import ChevronDoubleRight from '@/assets/svg/chevrondouble-right.svg';
import { FIRST_PAGE } from '@/constants';
import { PageOptions } from '../Pagination.component';
import * as Styled from './PageButtonList.styled';

interface Props {
  pageOptions: PageOptions;
  handleClickPage: (page: number) => (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const PageButtonList = ({ pageOptions, handleClickPage }: Props) => {
  const { currentPage, startPage, endPage, totalPages } = pageOptions;
  const prevPage = startPage <= FIRST_PAGE ? 0 : startPage - 1;
  const nextPage = endPage >= totalPages ? 0 : endPage + 1;
  const pages = [...Array(endPage - startPage + 1).keys()].map((diff) => startPage + diff);

  if (currentPage === 0) {
    return null;
  }

  return (
    <Styled.Navigation aria-label="Pagination">
      <Styled.ArrowButton
        aria-label="First page"
        disabled={currentPage === FIRST_PAGE}
        onClick={handleClickPage(FIRST_PAGE)}
      >
        <ChevronDoubleLeft />
      </Styled.ArrowButton>
      <Styled.ArrowButton
        aria-label="Previous page"
        disabled={startPage === FIRST_PAGE}
        onClick={handleClickPage(prevPage)}
      >
        <ChevronLeft />
      </Styled.ArrowButton>
      <Styled.OrderedList>
        {pages.map((page) => {
          const isActive = page === currentPage;
          return (
            <li key={`page${page}`}>
              <Styled.PageButton
                type="button"
                aria-label={`Page ${page}`}
                aria-current={isActive && 'page'}
                disabled={isActive}
                onClick={handleClickPage(page)}
              >
                {page}
              </Styled.PageButton>
            </li>
          );
        })}
      </Styled.OrderedList>
      <Styled.ArrowButton
        aria-label="Next page"
        disabled={endPage === totalPages}
        onClick={handleClickPage(nextPage)}
      >
        <ChevronRight />
      </Styled.ArrowButton>
      <Styled.ArrowButton
        aria-label="Last page"
        disabled={currentPage === totalPages}
        onClick={handleClickPage(totalPages)}
      >
        <ChevronDoubleRight />
      </Styled.ArrowButton>
    </Styled.Navigation>
  );
};

export default PageButtonList;
