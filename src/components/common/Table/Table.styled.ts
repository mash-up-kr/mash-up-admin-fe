import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Table = styled.table`
  width: 80rem;
  text-align: center;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  ${({ theme }) => css`
    background-color: ${theme.colors.gray10};
    border-top: ${theme.colors.gray40} solid 0.1rem;
  `}
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  ${({ theme }) => css`
    height: 5.2rem;
    border-bottom: ${theme.colors.gray20} solid 0.1rem;
  `}
`;

export const TableColumn = styled.th`
  ${({ theme }) => css`
    ${theme.fonts.medium14}

    width: 10rem;
    color: ${theme.colors.gray70};
    vertical-align: middle;

    &:last-child {
      width: 30rem;
    }
  `}
`;

export const TableCell = styled.td`
  ${({ theme }) => css`
    ${theme.fonts.regular14}

    width: 10rem;
    color: ${theme.colors.gray80};
    vertical-align: middle;

    &:last-child {
      width: 30rem;
    }
  `}
`;
