import React from 'react';
import * as Styled from './Select.styled';
import ChevronDown from '@/assets/svg/chevron-down-16.svg';
import { useToggleState } from '@/hooks';
import { ValueOf } from '@/types';

export interface SelectOption {
  value: string;
  label: string;
}

export const SelectSize = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
} as const;

export interface SelectProps {
  size: ValueOf<typeof SelectSize>;
  value: string;
  placeholder?: string;
  options: SelectOption[];
  setValue: (value: string) => void;
}

const Select = ({ size, value, placeholder = '전체', options, setValue }: SelectProps) => {
  const [isOpened, toggleOpened] = useToggleState(false);

  const handleClickOption = (optionValue: string) => {
    setValue(optionValue);
    toggleOpened();
  };

  return (
    <Styled.SelectContainer>
      <Styled.Select size={size} onClick={toggleOpened} isOpened={isOpened}>
        {!value ? (
          <Styled.SelectPlaceholder>{placeholder}</Styled.SelectPlaceholder>
        ) : (
          <Styled.SelectValue>{value}</Styled.SelectValue>
        )}
        <ChevronDown />
      </Styled.Select>
      <Styled.SelectMenu isOpened={isOpened}>
        {options.map((option) => (
          <Styled.SelectOption
            isSelected={value === option.value}
            key={option.label}
            onClick={() => handleClickOption(option.value)}
          >
            {option.value}
          </Styled.SelectOption>
        ))}
      </Styled.SelectMenu>
    </Styled.SelectContainer>
  );
};

export default Select;
