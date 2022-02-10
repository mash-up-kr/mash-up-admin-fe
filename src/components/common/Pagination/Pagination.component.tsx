import React from 'react';
import PageButtonList from './PageButtonList/PageButtonList.component';

export interface PageOptions {
  currentPage: number;
  startPage: number;
  endPage: number;
  totalPages: number;
  pagingSize: number;
}

interface Props {
  pageOptions: PageOptions;
  handleClickPage: (page: number) => (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Pagination = ({ pageOptions, handleClickPage }: Props) => {
  return (
    <div>
      <PageButtonList pageOptions={pageOptions} handleClickPage={handleClickPage} />
    </div>
  );
};

export default Pagination;
