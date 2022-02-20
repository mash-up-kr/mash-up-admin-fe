import React from 'react';
import Select, { SelectOption, SelectPosition } from '../../Select/Select.component';
import { ValueOf } from '@/types';

const OPTIONS: SelectOption[] = [
  { value: '10', label: '10' },
  { value: '20', label: '20' },
  { value: '30', label: '30' },
  { value: '50', label: '50' },
  { value: '100', label: '100' },
];

interface Props {
  pagingSize: number;
  position: ValueOf<typeof SelectPosition>;
  handleChangeSize: (pagingSize: string) => void;
}

const PagingSizeSelector = ({ pagingSize, position, handleChangeSize }: Props) => {
  const pagingSizeOption: SelectOption = {
    value: pagingSize.toString(),
    label: pagingSize.toString(),
  };
  const handleChange = (option: SelectOption) => {
    handleChangeSize(option.value);
  };

  if (pagingSize === 0) return null;

  return (
    <Select
      aria-label="Paging size selector"
      size="sm"
      position={position}
      initialValue={pagingSizeOption}
      options={OPTIONS}
      onChange={handleChange}
    />
  );
};

export default PagingSizeSelector;
