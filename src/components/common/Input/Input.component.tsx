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
  description?: string;
  errorMessage?: string;
}

const Input = (
  { id, className, $size, label, errorMessage, required, description, ...resetProps }: InputProps,
  ref: React.Ref<HTMLInputElement>,
) => {
  return (
    <Styled.InputWrapper className={className}>
      {label && (
        <Styled.InputLabel htmlFor={id}>
          <span>{label}</span>
          {required && <Styled.RequiredDot />}
        </Styled.InputLabel>
      )}
      {description && <Styled.Description>{description}</Styled.Description>}
      <Styled.Input ref={ref} id={id} $size={$size} errorMessage={errorMessage} {...resetProps} />
      {errorMessage && <Styled.InputErrorMessage>{errorMessage}</Styled.InputErrorMessage>}
    </Styled.InputWrapper>
  );
};

export default forwardRef<HTMLInputElement, InputProps>(Input);
