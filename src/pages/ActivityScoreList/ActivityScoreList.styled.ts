import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const PageWrapper = styled.div`
  padding: 2.8rem 0;
`;

export const Heading = styled.h2`
  ${({ theme }) => css`
    margin-bottom: 2.4rem;
    color: ${theme.colors.gray80};
    font-weight: 700;
    font-size: 3.6rem;
    line-height: 4.5rem;
  `}
`;

export const StickyContainer = styled.div`
  ${({ theme }) => css`
    position: sticky;
    top: 0;
    z-index: calc(${theme.zIndex.sticky} + 1);
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
    text-align: center;
    text-overflow: ellipsis;
  `};
`;

export const TitleLink = styled(Link)`
  position: absolute;
  inset: 0;
  cursor: pointer;
`;

export const TitleButton = styled.button`
  position: absolute;
  background-color: transparent;
  cursor: pointer;
  inset: 0;
`;
