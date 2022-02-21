import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const PageWrapper = styled.div`
  padding: 4rem 0 8rem 0;
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
