import React from 'react';
import { ValueOf } from '@/types';
import * as Styled from './Input.styled';

export const InputSize = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
} as const;

export type InputSizeType = ValueOf<typeof InputSize>;

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  $size: InputSizeType;
  inputId: string;
  label: string;
  errorMessage?: string;
}

const Input = ({
  className,
  inputId,
  $size,
  label,
  errorMessage,
  required,
  ...resetProps
}: InputProps) => {
  return (
    <Styled.InputWrapper>
      <Styled.InputLabel htmlFor={inputId}>
        <span>{label}</span>
        {required && <Styled.RequiredDot />}
      </Styled.InputLabel>

      <Styled.Input id={inputId} className={className} $size={$size} {...resetProps} />
      {errorMessage && <Styled.InputErrorMessage>{errorMessage}</Styled.InputErrorMessage>}
    </Styled.InputWrapper>
  );
};

export default Input;
