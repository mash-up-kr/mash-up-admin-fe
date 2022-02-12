import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const BackButtonWrapper = styled.button`
  ${({ theme }) =>
    css`
      ${theme.fonts.medium13}
      display: flex;
      gap: 0.2rem;
      align-items: center;
      justify-content: center;
      height: 3.6rem;
      padding: 0 0.8rem 0 0.2rem;
      background-color: transparent;

      &:hover {
        background-color: ${theme.colors.white};
        border-radius: 0.9rem;
      }
    `}
`;
