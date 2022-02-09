import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { neverExpected } from '@/utils/errors';
import { InputSize, InputSizeType } from './Input';

interface StyledInputProps {
  $size: InputSizeType;
}

const getInputSizeStyle = (size: InputSizeType, theme: Theme) => {
  switch (size) {
    case InputSize.xs:
      return css`
        ${theme.fonts.regular13};
        padding: 8px 12px;
      `;
    case InputSize.sm:
      return css`
        ${theme.fonts.regular15};
        padding: 8px 12px;
      `;
    case InputSize.md:
      return css`
        ${theme.fonts.regular15};
        padding: 12px 14px;
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
  ${({ theme }) => {
    const { colors, fonts } = theme;

    return css`
      ${fonts.medium15}
      display: flex;
      align-items: center;
      margin-bottom: 0.6rem;
      color: ${colors.gray70};
    `;
  }}
`;

export const RequiredDot = styled.span`
  width: 0.6rem;
  height: 0.6rem;
  margin-left: 0.6rem;
  background-color: #eb6963;
  border-radius: 50%;
`;

export const Input = styled.input<StyledInputProps>`
  ${({ theme, $size }) => {
    const { colors } = theme;

    return css`
      ${getInputSizeStyle($size, theme)}

      flex: 1;
      color: ${colors.gray70};
      border: 1px solid ${colors.gray30};
      border-radius: 9px;
      outline: none;

      &:hover {
        border: 1px solid ${colors.purple40};
      }

      &:focus {
        border: 1px solid ${colors.purple70};
      }

      &:disabled {
        background-color: ${colors.gray5};
        border: 1px solid ${colors.gray30};
      }
    `;
  }}
`;

export const InputErrorMessage = styled.span`
  ${({ theme }) => {
    const { colors, fonts } = theme;

    return css`
      ${fonts.regular15};

      margin-top: 6px;
      color: ${colors.gray60};
    `;
  }}
`;
