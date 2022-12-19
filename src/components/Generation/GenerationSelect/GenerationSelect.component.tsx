import React from 'react';
import { useRecoilValue } from 'recoil';
import { useSearchParams } from 'react-router-dom';
import { Select } from '@/components/common';

import { SelectOption, SelectSize } from '@/components/common/Select/Select.component';
import { $generations } from '@/store';

const GenerationSelect = () => {
  const generations = useRecoilValue($generations);
  const [searchParams, setSearchParams] = useSearchParams();

  const options = generations.map((generation) => ({
    label: `${generation.generationNumber}기`,
    value: generation.generationNumber.toString(),
  }));

  const defaultValue: SelectOption | undefined = generations.length
    ? {
        label: `${generations[0].generationNumber}기`,
        value: `${generations[0].generationNumber}`,
      }
    : undefined;

  const handleChangeGeneration = (selectedOption: SelectOption) => {
    if (selectedOption.value === defaultValue?.value) {
      searchParams.delete('generationNumber');
      setSearchParams(searchParams);

      return;
    }

    searchParams.set('generationNumber', selectedOption.value);
    setSearchParams(searchParams);
  };

  return (
    <Select
      size={SelectSize.xs}
      options={options}
      onChangeOption={(option) => handleChangeGeneration(option)}
      defaultValue={defaultValue}
    />
  );
};

export default GenerationSelect;
