import React, { ChangeEventHandler, forwardRef } from 'react';
import * as Styled from './ToggleButton.styled';

export interface ToggleButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  handleToggle?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  isChecked?: boolean;
}

const ToggleButton = (
  { handleToggle, disabled = false, isChecked, ...restProps }: ToggleButtonProps,
  ref: React.Ref<HTMLInputElement>,
) => {
  return (
    <Styled.ToggleButtonLabel disabled={disabled}>
      <input type="checkbox" checked={isChecked} ref={ref} onChange={handleToggle} {...restProps} />
      <Styled.ToggleButtonSlider />
    </Styled.ToggleButtonLabel>
  );
};

export default forwardRef<HTMLInputElement, ToggleButtonProps>(ToggleButton);
