import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { SORT_TYPE } from '@/constants';
import { ValueOf } from '@/types';
import { TextAlign } from './Table.component';

export const TableContainer = styled.div`
  height: 100%;
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
      linear-gradient(to left, transparent 0.7rem, black 0.7rem);
    mask-size: 100% 20000px;
    mask-position: left bottom;
    -webkit-mask-image: linear-gradient(to top, transparent, black),
      linear-gradient(to left, transparent 0.7rem, black 0.7rem);
    -webkit-mask-size: 100% 20000px;
    -webkit-mask-position: left bottom;

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
      -webkit-mask-position: left top;
    `}
  `}
`;

export const Table = styled.table<{ topStickyHeight?: number }>`
  ${({ theme, topStickyHeight }) => css`
    width: 100%;
    text-align: center;
    table-layout: fixed;
    background-color: ${theme.colors.white};
    border-collapse: collapse;

    ${topStickyHeight !== undefined &&
    css`
      position: sticky;
      top: ${topStickyHeight}rem;
      z-index: ${theme.zIndex.sticky};
    `}
  `}
`;

export const TableHeader = styled.thead`
  ${({ theme }) => css`
    background-color: ${theme.colors.gray10};
    border-top: ${theme.colors.gray40} solid 0.1rem;
  `}
`;

export const TableBody = styled.tbody<{ isEmpty?: boolean }>`
  ${({ theme, isEmpty }) => css`
    position: relative;

    & tr {
      &:hover {
        background-color: ${isEmpty ? 'transparent' : theme.colors.purple20};
      }
    }
  `};
`;

export const TableRow = styled.tr`
  ${({ theme }) => css`
    height: 5.2rem;
    border-bottom: ${theme.colors.gray20} solid 0.1rem;
  `}
`;

export const TableColumn = styled.th<{ sortable?: boolean; textAlign?: TextAlign }>`
  ${({ theme, sortable, textAlign }) => css`
    ${theme.fonts.medium14}

    color: ${theme.colors.gray70};
    text-align: ${textAlign};
    vertical-align: middle;

    & svg {
      transform: translate(0.1rem, 0.27rem);
    }

    ${sortable &&
    css`
      cursor: pointer;
    `}

    ${textAlign !== 'center' &&
    css`
      padding: 0 1.6rem;
    `}
  `}
`;

export const TableCell = styled.td<{ textAlign?: TextAlign }>`
  ${({ theme, textAlign }) => css`
    ${theme.fonts.regular14}

    height: 0;
    color: ${theme.colors.gray80};
    text-align: ${textAlign};
    vertical-align: middle;

    ${textAlign !== 'center' &&
    css`
      padding: 0 1.6rem;
    `}
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

export const CaretUpWrapper = styled.span<{ type: ValueOf<typeof SORT_TYPE> }>`
  ${({ type }) => css`
    ${type === SORT_TYPE.DESC &&
    css`
      & svg {
        transform: rotate(180deg) translate(-0.1rem, -0.25rem);
      }
    `}
  `}
`;

export const TableSupportBar = styled.div<{ topStickyHeight?: number }>`
  ${({ theme, topStickyHeight }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 6rem;
    padding: 3.2rem 0 1.9rem;
    background-color: ${theme.colors.white};

    ${topStickyHeight !== undefined &&
    css`
      position: sticky;
      top: ${topStickyHeight}rem;
      z-index: ${theme.zIndex.sticky};
    `}
  `}
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
      background-color: transparent;
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
    height: 26rem;
    color: ${theme.colors.gray70};
    border-bottom: ${theme.colors.gray20} solid 0.1rem;
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
