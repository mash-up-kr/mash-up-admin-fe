import React from 'react';
import * as Styled from './Textarea.styled';

export interface TextareaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  errorMessage?: string;
}

const Textarea = ({ id, required, label, errorMessage = '', ...restProps }: TextareaProps) => {
  return (
    <Styled.TextareaWrapper>
      <Styled.TextareaLabel htmlFor={id}>
        <span>{label}</span>
        {required && <Styled.RequiredDot />}
      </Styled.TextareaLabel>
      <Styled.Textarea {...restProps} />
      {errorMessage && <Styled.TextareaErrorMessage>{errorMessage}</Styled.TextareaErrorMessage>}
    </Styled.TextareaWrapper>
  );
};

export default Textarea;
