import React from 'react';
import { ValueOf } from '@/types';
import Styled from './Input.styled';

export const InputSize = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
} as const;

export type InputSizeType = ValueOf<typeof InputSize>;

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  $size: InputSizeType;
  label: string;
  errorMessage?: string;
}

const Input = ({ className, $size, label, errorMessage, required, ...resetProps }: InputProps) => {
  return (
    <Styled.InputWrapper>
      <Styled.InputLabel>
        <span>{label}</span>
        {required && <Styled.RequiredDot />}
      </Styled.InputLabel>

      <Styled.Input className={className} $size={$size} {...resetProps} />
      {errorMessage && <Styled.InputErrorMessage>{errorMessage}</Styled.InputErrorMessage>}
    </Styled.InputWrapper>
  );
};

export default Input;
