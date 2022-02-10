import React from 'react';
import * as Styled from './Checkbox.styled';
import CheckboxChecked from '@/assets/svg/checkbox-checked.svg';

export interface CheckboxProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  handleToggle: () => void;
  disabled?: boolean;
  isChecked?: boolean;
  label?: string;
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
      <Styled.CheckboxInput type="checkbox" onChange={handleToggle} checked={isChecked} />
      <Styled.CheckboxMark>
        <CheckboxChecked />
      </Styled.CheckboxMark>
      {label && <Styled.CheckboxText>{label}</Styled.CheckboxText>}
    </Styled.CheckboxWrapper>
  );
};

export default Checkbox;
