import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { InputSizeType } from './Input.component';

interface StyledInputProps {
  $size: InputSizeType;
}

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputLabel = styled.label`
  ${({ theme }) => css`
    ${theme.fonts.medium15}
    display: flex;
    align-items: center;
    margin-bottom: 0.6rem;
    color: ${theme.colors.gray70};
  `}
`;

export const RequiredDot = styled.span`
  width: 0.6rem;
  height: 0.6rem;
  margin-left: 0.6rem;
  background-color: #eb6963;
  border-radius: 50%;
`;

export const Input = styled.input<StyledInputProps>`
  ${({ theme, $size }) => css`
    ${theme.input.size[$size]};

    color: ${theme.colors.gray70};
    border: 0.1rem solid ${theme.colors.gray30};
    border-radius: 0.9rem;
    outline: none;

    &::placeholder {
      color: ${theme.colors.gray50};
    }

    &:hover {
      border: 0.1rem solid ${theme.colors.purple40};
    }

    &:focus {
      border: 0.1rem solid ${theme.colors.purple70};
    }

    &:disabled {
      background-color: ${theme.colors.gray5};
      border: 0.1rem solid ${theme.colors.gray30};
    }
  `}
`;

export const InputErrorMessage = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.regular15};

    margin-top: 0.6rem;
    color: ${theme.colors.gray60};
  `}
`;
