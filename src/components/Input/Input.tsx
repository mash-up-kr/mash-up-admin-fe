import React from 'react';
import Styled from './Input.styled';
import { InputProps } from './types';

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
