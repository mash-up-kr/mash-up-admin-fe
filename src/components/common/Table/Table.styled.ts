import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { SORT_TYPE } from '@/constants';
import { ValueOf } from '@/types';

export const TableContainer = styled.div<{ height: string }>`
  ${({ height }) => css`
    height: ${height};
  `}
`;

export const TableWrapper = styled.div`
  height: calc(100% - 10.4rem);
  margin-bottom: 2rem;
`;

export const TableBodyWrapper = styled.div<{ isLoading: boolean }>`
  ${({ theme, isLoading }) => css`
    position: relative;
    width: 100%;
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

    ${isLoading &&
    css`
      overflow-y: hidden;
      transition: mask-position 0s, -webkit-mask-position 0s;
      -webkit-mask-position: left top;
    `}
  `}
`;

export const Table = styled.table`
  width: 100%;
  text-align: center;
  table-layout: fixed;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  ${({ theme }) => css`
    background-color: ${theme.colors.gray10};
    border-top: ${theme.colors.gray40} solid 0.1rem;
  `}
`;

export const TableBody = styled.tbody<{ isEmpty?: boolean }>`
  ${({ theme, isEmpty }) => css`
    & tr {
      &:hover {
        background-color: ${isEmpty ? 'transparent' : theme.colors.purple20};
      }
    }
  `};
`;

export const TableRow = styled.tr<{ height: number }>`
  ${({ theme, height }) => css`
    height: ${height}rem;
    border-bottom: ${theme.colors.gray20} solid 0.1rem;
  `}
`;

export const TableColumn = styled.th<{ sortable?: boolean }>`
  ${({ theme, sortable }) => css`
    ${theme.fonts.medium14}

    color: ${theme.colors.gray70};
    vertical-align: middle;

    & svg {
      transform: translate(0.1rem, 0.27rem);
    }

    ${sortable &&
    css`
      cursor: pointer;
    `}
  `}
`;

export const TableCell = styled.td`
  ${({ theme }) => css`
    ${theme.fonts.regular14}

    height: 0;
    color: ${theme.colors.gray80};
    vertical-align: middle;
  `}
`;

export const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const CheckboxWrapper = styled(Center)`
  & label {
    transform: translateX(-0.5rem);
  }
`;

// TODO: (@minsour) 애니메이션 스펙 확정 후 지우거나 적용할 예정
// export const rotate = keyframes`
//   100% {
//     transform: rotate(180deg); // translate(-0.1rem, -0.27rem);
//     transform: rotate(180deg) translate(-0.1rem, -0.27rem);
//   }
// `;

export const CaretUpWrapper = styled.span<{ type: ValueOf<typeof SORT_TYPE> }>`
  ${({ type }) => css`
    ${type === SORT_TYPE.DESC &&
    css`
      & svg {
        /* TODO: (@minsour) 애니메이션 스펙 확정 후 지우거나 적용할 예정;
        transform: translate(-0.1rem, -0.27rem);
        animation: rotate 0.5s ease forwards; */
        transform: rotate(180deg) translate(-0.1rem, -0.25rem);
      }
    `}
  `}
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
    display: flex;

    & > div {
      display: flex;
      align-items: center;
    }

    & > div:nth-of-type(1) {
      ${theme.fonts.regular14}
      margin-right: 0.2rem;
      color: ${theme.colors.gray60};
    }

    & > div:nth-of-type(2) {
      ${theme.fonts.medium14}
      color: ${theme.colors.gray70}
    }

    & > div:nth-of-type(4) {
      ${theme.fonts.medium14}
      color: ${theme.colors.purple70}
    }

    & > div:nth-of-type(5) {
      ${theme.fonts.regular14}
      color: ${theme.colors.purple60}
    }

    & > div:nth-of-type(3) > div {
      height: 1.2rem;
      margin: 0 0.8rem;
      border-left: 0.1rem solid ${theme.colors.gray30};
    }
  `};
`;

export const TotalSelectBox = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.regular13};
    display: flex;
    gap: 1rem;
    height: 3.6rem;
    margin-left: 1.2rem;
    padding: 0.8rem 1.6rem;
    color: ${theme.colors.gray70};
    background-color: ${theme.colors.gray20};
    border-radius: 0.9rem;

    & span {
      ${theme.fonts.medium13};
    }

    & button {
      ${theme.fonts.medium13};
      padding: 0;
      color: ${theme.colors.purple70};
    }
  `};
`;

export const NoData = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.bold16}
    display: flex;
    flex-direction: column;
    gap: 2.6rem;
    align-items: center;
    justify-content: center;
    color: ${theme.colors.gray70};
  `}
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
