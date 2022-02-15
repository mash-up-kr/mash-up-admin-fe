import React from 'react';
import PagingSizeSelector from './PagingSizeSelector/PagingSizeSelector';
import PageButtonList from './PageButtonList/PageButtonList.component';
import * as Styled from './Pagination.styled';

export const FIRST_PAGE = 1;

export interface PageOptions {
  currentPage: number;
  startPage: number;
  endPage: number;
  totalPages: number;
  pagingSize: number;
}

export interface PaginationProps {
  pageOptions: PageOptions;
  selectableSize: boolean;
  handleChangePage: (page: number) => void;
  handleChangeSize: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Pagination = ({
  pageOptions,
  selectableSize,
  handleChangePage,
  handleChangeSize,
}: PaginationProps) => {
  const { currentPage, startPage, endPage, totalPages, pagingSize } = pageOptions;
  return (
    <Styled.Navigation aria-label="Pagination">
      <Styled.Box width="16rem" />
      <Styled.PageButtonListWrapper>
        <PageButtonList
          currentPage={currentPage}
          startPage={startPage}
          endPage={endPage}
          totalPages={totalPages}
          handleChangePage={handleChangePage}
        />
      </Styled.PageButtonListWrapper>
      <Styled.Box width="16rem">
        {selectableSize && (
          <PagingSizeSelector pagingSize={pagingSize} handleChangeSize={handleChangeSize} />
        )}
      </Styled.Box>
    </Styled.Navigation>
  );
};

export default Pagination;
