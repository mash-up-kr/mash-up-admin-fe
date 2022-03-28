import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const PageWrapper = styled.div`
  padding: 4rem 0;
`;

export const Heading = styled.h2`
  ${({ theme }) => css`
    margin-bottom: 1.2rem;
    color: ${theme.colors.gray80};
    font-weight: 700;
    font-size: 3.6rem;
    line-height: 4.5rem;
  `};
`;

export const StickyContainer = styled.div`
  ${({ theme }) => css`
    position: sticky;
    top: 0;
    z-index: ${theme.zIndex.sticky};
    padding: 1.2rem 0;
    background-color: ${theme.colors.white};
  `}
`;

export const TitleButton = styled.button`
  ${({ theme }) => css`
    position: relative;
    width: 100%;
    height: 5.2rem;
    padding: 0 1.6rem;
    overflow: hidden;
    color: ${theme.colors.purple80};
    white-space: nowrap;
    text-align: left;
    text-overflow: ellipsis;
    background-color: transparent;

    &:hover {
      color: ${theme.colors.purple90};
      font-weight: 500;
      text-decoration: underline;
      text-underline-position: under;
    }
  `};
`;

export const CustomUserProfile = styled.div`
  ${({ theme }) => css`
    & div:first-of-type {
      ${theme.fonts.regular14};
    }
  `}
`;

export const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
