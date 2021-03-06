import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface StyledCheckboxLabelProps {
  disabled: boolean;
}

export const CheckboxWrapper = styled.label<StyledCheckboxLabelProps>`
  ${({ theme, disabled }) => css`
    ${disabled
      ? css`
          opacity: 0.5;
          pointer-events: none;
        `
      : ''}
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: fit-content;
    height: 1.2rem;
    padding: 0 0;
    cursor: pointer;
    user-select: none;

    & > input {
      ${theme.a11y.visuallyHidden}
    }
  `}
`;

export const CheckboxMark = styled.span`
  ${({ theme }) => css`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.2rem;
    height: 1.2rem;
    background-color: ${theme.colors.white};
    border: solid 0.1rem ${theme.colors.gray30};
    border-radius: 0.2rem;

    label:hover input ~ & {
      opacity: 0.9;
    }

    label input:checked ~ & {
      background-color: ${theme.colors.purple70};
      border-color: ${theme.colors.purple70};
    }

    label input:checked ~ &::after {
      display: block;
    }
  `}
`;

export const CheckboxText = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.medium14}
    padding-left: 2rem;
  `}
`;
