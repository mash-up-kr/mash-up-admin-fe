import React, { ChangeEventHandler } from 'react';
import * as Styled from './Checkbox.styled';
import CheckboxChecked from '@/assets/svg/checkbox-active-12.svg';

export interface CheckboxProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  handleToggle?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  isChecked?: boolean;
  label?: React.ReactNode;
}

const Checkbox = ({
  handleToggle,
  disabled = false,
  isChecked,
  label = '',
  ...resetProps
}: CheckboxProps) => {
  return (
    <Styled.CheckboxWrapper {...resetProps} disabled={disabled}>
      <input type="checkbox" onChange={handleToggle} checked={isChecked} />
      <Styled.CheckboxMark>
        <CheckboxChecked />
      </Styled.CheckboxMark>
      {label && <Styled.CheckboxText>{label}</Styled.CheckboxText>}
    </Styled.CheckboxWrapper>
  );
};

export default Checkbox;
