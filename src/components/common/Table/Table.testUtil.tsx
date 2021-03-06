import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Table, { TableColumn } from './Table.component';
import { theme } from '@/styles';

interface Params<T extends object> {
  prefix?: string;
  _columns: TableColumn<T>[];
  _data: T[];
  isLoading?: boolean;
}

export const renderTable = <T extends object>({
  prefix = 'application',
  _columns,
  _data,
  isLoading = false,
}: Params<T>) => {
  render(
    <RecoilRoot>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Table<T>
            prefix={prefix}
            columns={_columns}
            rows={_data}
            isLoading={isLoading}
            supportBar={{ totalCount: _data.length, totalSummaryText: '총 지원설문지' }}
          />
        </ThemeProvider>
      </BrowserRouter>
    </RecoilRoot>,
  );

  const TableHeader = () => screen.getAllByRole('row')[0];
  const TableRows = () => screen.getAllByRole('row').slice(1);
  const TotalCheckbox = () => screen.getByLabelText('Total Checkbox');
  const RowCheckbox = (rowIndex: number) => screen.getAllByLabelText(/Checkbox \d+/)[rowIndex];
  const SortingColumn = (column: string) => screen.getByLabelText(`Sorting Column ${column}`);
  const LoadingDimmed = () => screen.getByLabelText('Dimmed');

  const clickRowCheckbox = (rowIndex: number) => {
    userEvent.click(RowCheckbox(rowIndex));
  };
  const clickTotalCheckbox = () => {
    userEvent.click(TotalCheckbox());
  };
  const sortColumn = (column: string) => {
    userEvent.click(SortingColumn(column));
  };

  return {
    TableHeader,
    TableRows,
    TotalCheckbox,
    RowCheckbox,
    SortingColumn,
    LoadingDimmed,
    clickRowCheckbox,
    clickTotalCheckbox,
    sortColumn,
  };
};
