import React, { forwardRef, useEffect, useRef, useState } from 'react';
import * as Styled from './Select.styled';
import ChevronDown from '@/assets/svg/chevron-down-16.svg';
import { useOnClickOutSide } from '@/hooks';
import { ValueOf } from '@/types';

// TODO:(@mango906): 나중에 되면 SelectOption value 제네릭으로 써주기
export interface SelectOption {
  value: string;
  label: string;
}

export const SelectSize = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
} as const;

export const SelectPosition = {
  top: 'top',
  bottom: 'bottom',
} as const;

export interface SelectProps {
  className?: string;
  size: ValueOf<typeof SelectSize>;
  label?: string;
  required?: boolean;
  position?: ValueOf<typeof SelectPosition>;
  placeholder?: string;
  options: SelectOption[];
  isFullWidth?: boolean;
  onChangeOption?: (option: SelectOption) => void;
  disabled?: boolean;
  defaultValue?: SelectOption;
  currentValue?: SelectOption;
}

const Select = (
  {
    className,
    size,
    label,
    required = false,
    position = SelectPosition.bottom,
    placeholder = '전체',
    options,
    isFullWidth = false,
    defaultValue,
    currentValue,
    onChangeOption,
    disabled = false,
  }: SelectProps,
  ref: React.Ref<HTMLInputElement>,
) => {
  const [isOpened, setOpened] = useState(false);

  const [selectedOption, setSelectedOption] = useState<SelectOption | undefined>(defaultValue);

  const containerRef = useRef<HTMLDivElement>(null);

  const toggleOpened = () => {
    if (disabled) {
      return;
    }

    setOpened(!isOpened);
  };

  const handleClickOption = (option: SelectOption) => {
    setSelectedOption(option);
    toggleOpened();
    onChangeOption?.(option);
  };

  useEffect(() => {
    if (defaultValue) {
      setSelectedOption(defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue?.value]);

  useEffect(() => {
    if (currentValue) {
      setSelectedOption(currentValue);
    }
  }, [currentValue]);

  useOnClickOutSide(containerRef, () => {
    setOpened(false);
  });

  return (
    <Styled.SelectContainer ref={containerRef} className={className} isFullWidth={isFullWidth}>
      <Styled.Select
        $size={size}
        label={label}
        required={required}
        ref={ref}
        onClick={toggleOpened}
        isOpened={isOpened}
        position={position}
        disabled={disabled}
        placeholder={placeholder}
        endIcon={<ChevronDown />}
        value={selectedOption?.label || defaultValue?.label}
        readOnly
        fill
      />
      <Styled.SelectMenu isOpened={isOpened} position={position}>
        {options.map((option) => (
          <Styled.SelectOption
            isSelected={selectedOption?.value === option.value}
            key={option.value}
            onClick={() => handleClickOption(option)}
          >
            {option.label}
          </Styled.SelectOption>
        ))}
      </Styled.SelectMenu>
    </Styled.SelectContainer>
  );
};

export default forwardRef<HTMLInputElement, SelectProps>(Select);
