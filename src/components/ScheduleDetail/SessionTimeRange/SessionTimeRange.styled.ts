import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const SessionTimeRange = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.medium13};

    display: flex;
    align-items: center;
    padding: 0.4rem 0.8rem;
    color: ${theme.colors.brand500};
    background-color: ${theme.colors.brand100};
    border-radius: 10rem;

    svg {
      margin-right: 0.4rem;
    }
  `}
`;
