import React from 'react';
import * as Styled from './Textarea.styled';

export interface TextareaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  description?: string;
  errorMessage?: string;
}

const Textarea = ({
  id,
  required,
  label,
  description,
  className,
  errorMessage = '',
  ...restProps
}: TextareaProps) => {
  return (
    <Styled.TextareaWrapper className={className}>
      {label && (
        <Styled.TextareaLabel htmlFor={id}>
          <span>{label}</span>
          {required && <Styled.RequiredDot />}
        </Styled.TextareaLabel>
      )}
      {description && <Styled.Description>{description}</Styled.Description>}
      <Styled.Textarea {...restProps} />
      {errorMessage && <Styled.TextareaErrorMessage>{errorMessage}</Styled.TextareaErrorMessage>}
    </Styled.TextareaWrapper>
  );
};

export default Textarea;
