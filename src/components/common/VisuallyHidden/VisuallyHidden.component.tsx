import React from 'react';
import { VisuallyHiddenInputWrapper, VisuallyHiddenSpanWrapper } from './VisuallyHidden.styled';

export interface VisuallyHiddenProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isSpan?: boolean;
}

const VisuallyHidden = ({ children, isSpan = false, ...resetProps }: VisuallyHiddenProps) => {
  if (isSpan) {
    return <VisuallyHiddenSpanWrapper {...resetProps}>{children}</VisuallyHiddenSpanWrapper>;
  }

  return <VisuallyHiddenInputWrapper {...resetProps}>{children}</VisuallyHiddenInputWrapper>;
};

export default VisuallyHidden;
