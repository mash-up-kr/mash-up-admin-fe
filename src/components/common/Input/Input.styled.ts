import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { neverExpected } from '@/utils/errors';
import { InputSize, InputSizeType } from './Input.component';

interface StyledInputProps {
  $size: InputSizeType;
}

const getInputSizeStyle = (size: InputSizeType, theme: Theme) => {
  switch (size) {
    case InputSize.xs:
      return css`
        ${theme.fonts.regular13};
        padding: 0.8rem 1.2rem;
      `;
    case InputSize.sm:
      return css`
        ${theme.fonts.regular15};
        padding: 0.8rem 1.2rem;
      `;
    case InputSize.md:
      return css`
        ${theme.fonts.regular15};
        padding: 1.2rem 1.4rem;
      `;
    default:
      neverExpected(size);
  }
};

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
    ${getInputSizeStyle($size, theme)}

    color: ${theme.colors.gray70};
    border: 0.1rem solid ${theme.colors.gray30};
    border-radius: 0.9rem;
    outline: none;

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
