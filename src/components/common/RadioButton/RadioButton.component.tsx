import React, { forwardRef } from 'react';
import * as Styled from './RadioButton.styled';

export interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  defaultChecked?: boolean;
  label?: string;
}

const RadioButton = (
  {
    className,
    disabled = false,
    defaultChecked = false,
    label = '',
    ...resetProps
  }: RadioButtonProps,
  ref: React.Ref<HTMLInputElement>,
) => {
  return (
    <Styled.RadioButtonWrapper className={className} disabled={disabled}>
      <input ref={ref} type="radio" defaultChecked={defaultChecked} {...resetProps} />
      <Styled.RadioButtonMark>
        <span />
      </Styled.RadioButtonMark>
      {label && <Styled.RadioButtonText>{label}</Styled.RadioButtonText>}
    </Styled.RadioButtonWrapper>
  );
};

export default forwardRef<HTMLInputElement, RadioButtonProps>(RadioButton);
