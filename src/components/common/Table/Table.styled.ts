import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const TableContainer = styled.div`
  margin-bottom: 2rem;
`;

export const TableBodyWrapper = styled.div`
  ${({ theme }) => css`
    width: 120rem;
    height: calc(100% - 5.2rem);
    overflow-x: hidden;
    overflow-y: auto;

    /* reference: https://css-tricks.com/scrollbars-on-hover */
    mask-image: linear-gradient(to top, transparent, black),
      linear-gradient(to left, transparent 17px, black 17px);
    mask-size: 100% 20000px;
    mask-position: left bottom;
    -webkit-mask-image: linear-gradient(to top, transparent, black),
      linear-gradient(to left, transparent 17px, black 17px);
    -webkit-mask-size: 100% 20000px;
    -webkit-mask-position: left bottom;
    transition: mask-position 0.3s, -webkit-mask-position 0.3s;

    &::-webkit-scrollbar {
      width: 0.7rem;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${theme.colors.gray30};
      border-radius: 0.5rem;
    }

    &:hover {
      -webkit-mask-position: left top;
    }
  `}
`;

export const Table = styled.table`
  width: 120rem;
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

    color: ${theme.colors.gray70};
    vertical-align: middle;
  `}
`;

export const TableCell = styled.td`
  ${({ theme }) => css`
    ${theme.fonts.regular14}

    color: ${theme.colors.gray80};
    vertical-align: middle;
  `}
`;
