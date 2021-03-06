import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Button from '../Button/Button.component';

export const BarContainer = styled.form`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 6.8rem;
    padding: 0 1.8rem;
    background-color: ${theme.colors.gray5};
    border: 0.1rem solid ${theme.colors.gray30};
    border-radius: 1.2rem;
  `};
`;

export const SelectContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 3.6rem;

    & > div {
      ${theme.fonts.medium13}
      display: flex;
      gap: 1.2rem;
      align-items: center;
      color: ${theme.colors.gray70};

      & span {
        color: ${theme.colors.gray80};
      }
    }
  `}
`;

export const SearchInputContainer = styled.div`
  display: flex;
  gap: 0.4rem;
  width: 32.4rem;
  height: 3.6rem;
`;

export const SearchButton = styled(Button)`
  ${({ theme }) => css`
    ${theme.fonts.medium13}
  `};
`;
