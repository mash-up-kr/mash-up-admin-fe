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
    margin-bottom: 1.2rem;
    padding: 0 1.8rem;
    background-color: ${theme.colors.gray5};
    border: 0.1rem solid ${theme.colors.gray30};
    border-radius: 1.2rem;
  `};
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
