import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const TableContainer = styled.div`
  height: 68rem;
`;

export const TableWrapper = styled.div`
  height: calc(100% - 10.4rem);
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

export const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TableSupportBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3.6rem;
  margin: 1.2rem 0;
`;

export const TableSummary = styled.div`
  ${({ theme }) => css`
    & span:nth-child(1) {
      ${theme.fonts.regular14}
      margin-right: 0.2rem;
      color: ${theme.colors.gray60};
    }

    & span:nth-child(2) {
      ${theme.fonts.regular14}
      color: ${theme.colors.gray60}
    }

    & span:nth-child(3) {
      height: 1.2rem;
      margin: 0 0.8rem;
      border: 0.1rem solid ${theme.colors.gray30};
    }

    & span:nth-child(4) {
      ${theme.fonts.medium14}
      color: ${theme.colors.purple70}
    }

    & span:nth-child(5) {
      ${theme.fonts.regular14}
      color: ${theme.colors.purple60}
    }
  `};
`;

export const TableSupportButtonContainer = styled.div`
  display: flex;

  & button {
    margin-right: 0.4rem;
  }

  & button:last-child {
    margin-right: 0;
  }
`;
