import { css } from '@emotion/react';
import styled from '@emotion/styled';

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
