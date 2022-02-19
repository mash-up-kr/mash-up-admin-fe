import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Headline = styled.h1`
  ${({ theme }) => css`
    margin: 1.2rem 0 0.8rem;
    color: ${theme.colors.gray80};
    font-size: 3.6rem;
    line-height: 4.5rem;
  `}
`;
