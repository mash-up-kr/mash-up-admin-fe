import React, { forwardRef, ReactElement } from 'react';
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
  fill?: boolean;
  endIcon?: ReactElement;
}

const Input = (
  {
    id,
    className,
    $size,
    label,
    errorMessage,
    required,
    description,
    fill,
    endIcon,
    disabled,
    onClick,
    ...resetProps
  }: InputProps,
  ref: React.Ref<HTMLInputElement>,
) => {
  return (
    <Styled.InputContainer className={className} fill={fill}>
      {label && (
        <Styled.InputLabel htmlFor={id}>
          <span>{label}</span>
          {required && <Styled.RequiredDot />}
        </Styled.InputLabel>
      )}
      {description && <Styled.Description>{description}</Styled.Description>}
      <Styled.InputWrapper onClick={onClick} errorMessage={errorMessage} disabled={disabled}>
        <Styled.Input $size={$size} ref={ref} id={id} disabled={disabled} {...resetProps} />
        {endIcon}
      </Styled.InputWrapper>
      {errorMessage && <Styled.InputErrorMessage>{errorMessage}</Styled.InputErrorMessage>}
    </Styled.InputContainer>
  );
};

export default forwardRef<HTMLInputElement, InputProps>(Input);
