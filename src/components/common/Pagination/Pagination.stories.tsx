import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Pagination, { PaginationProps } from './Pagination.component';
import { usePagination } from '@/hooks';
import { SelectPosition } from '../Select/Select.component';

export default {
  title: 'Pagination',
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args: PaginationProps) => {
  return <Pagination {...args} />;
};

export const OnePageCase = Template.bind({});
OnePageCase.args = {
  pageOptions: {
    currentPage: 1,
    endPage: 1,
    pagingSize: 20,
    startPage: 1,
    totalPages: 1,
  },
  selectableSize: true,
  handleChangePage: () => () => {},
  handleChangeSize: () => {},
};

export const FivePagesCase = Template.bind({});
FivePagesCase.args = {
  pageOptions: {
    currentPage: 3,
    endPage: 5,
    pagingSize: 20,
    startPage: 1,
    totalPages: 5,
  },
  selectableSize: true,
  handleChangePage: () => () => {},
  handleChangeSize: () => {},
};

export const TenPagesCase = Template.bind({});
TenPagesCase.args = {
  pageOptions: {
    currentPage: 1,
    endPage: 10,
    pagingSize: 20,
    startPage: 1,
    totalPages: 10,
  },
  selectableSize: true,
  handleChangePage: () => () => {},
  handleChangeSize: () => {},
};

export const TwentyFivePagesCase = Template.bind({});
TwentyFivePagesCase.args = {
  pageOptions: {
    currentPage: 13,
    endPage: 20,
    pagingSize: 20,
    startPage: 11,
    totalPages: 25,
  },
  selectableSize: true,
  handleChangePage: () => () => {},
  handleChangeSize: () => {},
};

export const UsingPagination = () => {
  const { pageOptions, handleChangePage, handleChangeSize } = usePagination({
    totalCount: 550,
  });

  return (
    <Pagination
      pageOptions={pageOptions}
      selectableSize
      handleChangePage={handleChangePage}
      handleChangeSize={handleChangeSize}
      selectBoxPosition={SelectPosition.bottom}
    />
  );
};
