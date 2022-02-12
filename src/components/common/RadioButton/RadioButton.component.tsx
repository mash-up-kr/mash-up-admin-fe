import React, { MouseEventHandler } from 'react';
import * as Styled from './RadioButton.styled';

export interface RadioButtonProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  handleClickButton: MouseEventHandler<HTMLInputElement>;
  disabled?: boolean;
  defaultChecked?: boolean;
  label?: string;
}

const RadioButton = ({
  handleClickButton,
  disabled = false,
  defaultChecked = false,
  label = '',
  ...resetProps
}: RadioButtonProps) => {
  return (
    <Styled.RadioButtonWrapper {...resetProps} disabled={disabled}>
      <Styled.RadioButtonInput
        type="radio"
        onClick={handleClickButton}
        defaultChecked={defaultChecked}
      />
      <Styled.RadioButtonMark>
        <span />
      </Styled.RadioButtonMark>
      {label && <Styled.RadioButtonText>{label}</Styled.RadioButtonText>}
    </Styled.RadioButtonWrapper>
  );
};

export default RadioButton;
