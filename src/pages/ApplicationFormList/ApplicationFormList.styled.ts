import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from '@/components';

export const PageWrapper = styled.div`
  padding: 4rem 0;
`;

export const Heading = styled.h2`
  ${({ theme }) => css`
    margin-bottom: 2.4rem;
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
    padding-bottom: 1.2rem;
    background-color: ${theme.colors.white};
  `}
`;

export const FormTitleWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;

    &:hover {
      color: ${theme.colors.purple90};
      font-weight: 500;
      text-decoration: underline;
      text-underline-position: under;
    }
  `};
`;

export const FormTitle = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
    padding: 0 1rem;
    overflow: hidden;
    color: ${theme.colors.purple80};
    line-height: 5.2rem;
    white-space: nowrap;
    text-align: left;
    text-overflow: ellipsis;
  `};
`;

export const TitleLink = styled(Link)`
  position: absolute;
  inset: 0;
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
