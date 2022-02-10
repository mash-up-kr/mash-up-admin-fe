import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageOptions } from '@/components/common/Pagination/Pagination.component';
import { DEFAULT_PAGING_SIZE, DEFAULT_PAGE_BUTTONS_SIZE, FIRST_PAGE } from '@/constants';
import useMount from './useMount';

interface GetPageOptionsParams {
  totalCount: number;
  pageIndex: number;
  pagingSize: number;
  pageButtonsSize: number;
}

const getPageOptions = ({
  totalCount,
  pagingSize,
  pageIndex,
  pageButtonsSize,
}: GetPageOptionsParams): PageOptions => {
  const totalPages = Math.ceil(totalCount / pagingSize);
  const startPage = Math.floor(pageIndex / pageButtonsSize) * pageButtonsSize;
  const endPage = startPage + pageButtonsSize;

  return {
    currentPage: pageIndex + 1,
    startPage: startPage + 1,
    endPage: endPage > totalPages ? totalPages : endPage,
    totalPages,
    pagingSize,
  };
};

const usePagination = (totalCount: number, pageButtonsSize = DEFAULT_PAGE_BUTTONS_SIZE) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageOptions, setPageOptions] = useState<PageOptions>({
    currentPage: 0,
    startPage: 0,
    endPage: 0,
    totalPages: 0,
    pagingSize: 0,
  });

  const handleChangePage = (page: number) => () => {
    if (page === 0) return;

    const newPageOptions = getPageOptions({
      totalCount,
      pageIndex: page - 1,
      pagingSize: pageOptions.pagingSize,
      pageButtonsSize,
    });
    const { currentPage, pagingSize } = newPageOptions;

    setPageOptions(newPageOptions);
    setSearchParams({ page: currentPage.toString(), size: pagingSize.toString() });
  };

  useMount(() => {
    if (totalCount === 0) return;

    const currentPage = searchParams.get('page');
    const currentSize = searchParams.get('size');
    const newPageOptions = getPageOptions({
      totalCount,
      pageIndex: currentPage ? parseInt(currentPage, 10) - 1 : FIRST_PAGE - 1,
      pagingSize: currentSize ? parseInt(currentSize, 10) : DEFAULT_PAGING_SIZE,
      pageButtonsSize,
    });

    setPageOptions(newPageOptions);
  });

  return {
    pageOptions,
    handleChangePage,
  };
};

export default usePagination;
