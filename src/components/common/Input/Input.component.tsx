import React, { forwardRef } from 'react';
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
  label?: string;
  errorMessage?: string;
}

const Input = (
  { id, className, $size, label, errorMessage, required, ...resetProps }: InputProps,
  ref: React.Ref<HTMLInputElement>,
) => {
  return (
    <Styled.InputWrapper>
      {label && (
        <Styled.InputLabel htmlFor={id}>
          <span>{label}</span>
          {required && <Styled.RequiredDot />}
        </Styled.InputLabel>
      )}

      <Styled.Input ref={ref} id={id} className={className} $size={$size} {...resetProps} />
      {errorMessage && <Styled.InputErrorMessage>{errorMessage}</Styled.InputErrorMessage>}
    </Styled.InputWrapper>
  );
};

export default forwardRef<HTMLInputElement, InputProps>(Input);
