import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface StyledRadioButtonLabelProps {
  disabled: boolean;
}

export const RadioButtonWrapper = styled.label<StyledRadioButtonLabelProps>`
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
    height: 2.2rem;
    padding: 0 0;
    cursor: pointer;
    user-select: none;

    & > input {
      ${theme.a11y.visuallyHidden}
    }
  `}
`;

export const RadioButtonMark = styled.span`
  ${({ theme }) => css`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.2rem;
    height: 2.2rem;
    background-color: ${theme.colors.white};
    border: solid 0.1rem ${theme.colors.gray30};
    border-radius: 50%;

    label:hover input ~ & {
      opacity: 0.9;
    }

    label input:checked ~ & {
      background-color: ${theme.colors.purple70};

      & > span {
        width: 1rem;
        height: 1rem;
        background-color: ${theme.colors.white};
        border-radius: 50%;
      }
    }

    label input:checked ~ &::after {
      display: block;
    }
  `}
`;

export const RadioButtonText = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.medium14}
    padding-left: 3.8rem;
  `}
`;
