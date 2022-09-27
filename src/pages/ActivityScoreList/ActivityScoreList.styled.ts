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
    z-index: ${theme.zIndex.select};
    padding-bottom: 1.2rem;
    background-color: ${theme.colors.white};
  `}
`;

export const TitleLink = styled(Link)`
  ${({ theme }) => css`
    color: ${theme.colors.purple80};

    &:hover {
      color: ${theme.colors.purple90};
      font-weight: 500;
      text-decoration: underline;
      text-underline-position: under;
    }
  `}
`;
