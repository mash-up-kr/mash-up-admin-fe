import React from 'react';
import Styled from './Input.styled';

export const InputSize = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
} as const;

export type InputSizeType = typeof InputSize[keyof typeof InputSize];

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  $size: InputSizeType;
  label?: string;
  errorMessage?: string;
}

const Input = ({ className, $size, label, errorMessage, ...resetProps }: InputProps) => {
  return (
    <Styled.InputWrapper>
      {label && <Styled.InputLabel>{label}</Styled.InputLabel>}
      <Styled.Input className={className} $size={$size} {...resetProps} />
      {errorMessage && <Styled.InputErrorMessage>{errorMessage}</Styled.InputErrorMessage>}
    </Styled.InputWrapper>
  );
};

export default Input;