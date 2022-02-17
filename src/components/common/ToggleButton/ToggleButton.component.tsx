import React, { ChangeEventHandler, forwardRef } from 'react';
import * as Styled from './ToggleButton.styled';

export interface ToggleButtonProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  handleToggle?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  isChecked?: boolean;
}

const ToggleButton = (
  { handleToggle, disabled = false, isChecked, ...restProps }: ToggleButtonProps,
  ref: React.Ref<HTMLInputElement>,
) => {
  return (
    <Styled.ToggleButtonLabel {...restProps} disabled={disabled}>
      <input type="checkbox" onChange={handleToggle} checked={isChecked} ref={ref} />
      <Styled.ToggleButtonSlider />
    </Styled.ToggleButtonLabel>
  );
};

export default forwardRef<HTMLInputElement, ToggleButtonProps>(ToggleButton);
