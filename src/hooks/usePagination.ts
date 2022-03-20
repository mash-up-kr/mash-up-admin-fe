import { useEffect, useState } from 'react';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { PageOptions, FIRST_PAGE } from '@/components/common/Pagination/Pagination.component';

const DEFAULT_PAGING_SIZE = 20;
const DEFAULT_PAGE_BUTTONS_SIZE = 10;

interface GetPageOptionsParams {
  totalCount: number;
  pageIndex: number;
  pagingSize: number;
  pageButtonsSize: number;
}

interface UsePaginationParams {
  totalCount: number;
  isReplaceUrl?: boolean;
  pageButtonsSize?: number;
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

const usePagination = ({
  totalCount,
  isReplaceUrl = false,
  pageButtonsSize = DEFAULT_PAGE_BUTTONS_SIZE,
}: UsePaginationParams) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageOptions, setPageOptions] = useState<PageOptions>({
    currentPage: 0,
    startPage: 0,
    endPage: 0,
    totalPages: 0,
    pagingSize: 0,
  });

  const handleSearchParams = (urlSearchParams: URLSearchParamsInit) => {
    setSearchParams(urlSearchParams, {
      replace: isReplaceUrl,
    });
  };

  const handleChangePage = (page: number) => {
    if (page === 0) return;

    const newPageOptions = getPageOptions({
      totalCount,
      pageIndex: page - 1,
      pagingSize: pageOptions.pagingSize,
      pageButtonsSize,
    });
    const { currentPage } = newPageOptions;

    searchParams.set('page', currentPage.toString());
    handleSearchParams(searchParams);
  };

  const handleChangeSize = (pagingSize: string) => {
    let newPageOptions = getPageOptions({
      totalCount,
      pageIndex: pageOptions.currentPage - 1,
      pagingSize: parseInt(pagingSize, 10),
      pageButtonsSize,
    });

    const { currentPage, endPage } = newPageOptions;
    if (currentPage > endPage) {
      newPageOptions = {
        ...newPageOptions,
        currentPage: newPageOptions.endPage,
      };
    }

    searchParams.set('size', pagingSize);
    handleSearchParams(searchParams);
  };

  useEffect(() => {
    if (!totalCount) return;

    const currentPage = searchParams.get('page');
    const currentSize = searchParams.get('size');
    const newPageOptions = getPageOptions({
      totalCount,
      pageIndex: currentPage ? parseInt(currentPage, 10) - 1 : FIRST_PAGE - 1,
      pagingSize: currentSize ? parseInt(currentSize, 10) : DEFAULT_PAGING_SIZE,
      pageButtonsSize,
    });

    if (newPageOptions.currentPage > newPageOptions.endPage) {
      handleSearchParams({
        page: newPageOptions.endPage.toString(),
        size: newPageOptions.pagingSize.toString(),
      });
      return;
    }

    setPageOptions(newPageOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalCount, searchParams]);

  return {
    pageOptions,
    handleChangePage,
    handleChangeSize,
  };
};

export default usePagination;
