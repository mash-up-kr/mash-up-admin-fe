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

interface Props {
  pageOptions: PageOptions;
  handleChangePage: (page: number) => (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleChangeSize: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Pagination = ({ pageOptions, handleChangePage, handleChangeSize }: Props) => {
  const { currentPage, startPage, endPage, totalPages, pagingSize } = pageOptions;
  return (
    <Styled.Navigation aria-label="Pagination">
      <PageButtonList
        currentPage={currentPage}
        startPage={startPage}
        endPage={endPage}
        totalPages={totalPages}
        handleChangePage={handleChangePage}
      />
      <PagingSizeSelector pagingSize={pagingSize} handleChangeSize={handleChangeSize} />
    </Styled.Navigation>
  );
};

export default Pagination;
