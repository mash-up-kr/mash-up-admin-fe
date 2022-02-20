import React from 'react';
import PagingSizeSelector from './PagingSizeSelector/PagingSizeSelector';
import PageButtonList from './PageButtonList/PageButtonList.component';
import * as Styled from './Pagination.styled';
import { SelectPosition } from '../Select/Select.component';
import { ValueOf } from '@/types';

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
  selectBoxPosition: ValueOf<typeof SelectPosition>;
  handleChangePage: (page: number) => void;
  handleChangeSize: (pagingSize: string) => void;
}

const Pagination = ({
  pageOptions,
  selectableSize,
  selectBoxPosition,
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
          <PagingSizeSelector
            pagingSize={pagingSize}
            position={selectBoxPosition}
            handleChangeSize={handleChangeSize}
          />
        )}
      </Styled.Box>
    </Styled.Navigation>
  );
};

export default Pagination;
