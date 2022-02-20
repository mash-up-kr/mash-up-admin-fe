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
  position?: ValueOf<typeof SelectPosition>;
  placeholder?: string;
  options: SelectOption[];
  defaultValue?: string;
  onChangeOption?: (option: SelectOption) => void;
}

const Select = (
  {
    className,
    size,
    position = SelectPosition.bottom,
    placeholder = '전체',
    options,
    defaultValue,
    onChangeOption,
  }: SelectProps,
  ref: React.Ref<HTMLSelectElement>,
) => {
  const [isOpened, setOpened] = useState(false);

  const [selectedOption, setSelectedOption] = useState<SelectOption | undefined>(undefined);

  const outerRef = useRef<HTMLDivElement>(null);

  const toggleOpened = () => {
    setOpened(!isOpened);
  };

  const handleClickOption = (option: SelectOption) => {
    setSelectedOption(option);
    toggleOpened();
    onChangeOption?.(option);
  };

  useEffect(() => {
    if (defaultValue) {
      const targetOption = options.find((option) => option.value === defaultValue);

      if (!targetOption) {
        return;
      }

      setSelectedOption(targetOption);
      onChangeOption?.(targetOption);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue, options]);

  useOnClickOutSide(outerRef, () => setOpened(false));

  return (
    <div ref={outerRef}>
      <Styled.SelectContainer className={className}>
        <Styled.Select size={size} onClick={toggleOpened} isOpened={isOpened} position={position}>
          {selectedOption ? (
            <Styled.SelectValue>{selectedOption.label}</Styled.SelectValue>
          ) : (
            <Styled.SelectPlaceholder>{placeholder}</Styled.SelectPlaceholder>
          )}
          <ChevronDown />
        </Styled.Select>
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
      {/* SelectField를 위해 보이지 않는 select 추가 */}
      <Styled.HiddenSelect ref={ref} value={selectedOption?.value} disabled>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Styled.HiddenSelect>
    </div>
  );
};

export default forwardRef<HTMLSelectElement, SelectProps>(Select);
