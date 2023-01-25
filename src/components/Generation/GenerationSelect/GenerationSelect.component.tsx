import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { useSearchParams } from 'react-router-dom';
import { Select } from '@/components/common';

import { SelectOption, SelectSize } from '@/components/common/Select/Select.component';
import { $generationNumber, $generations } from '@/store';

const GenerationSelect = () => {
  const generations = useRecoilValue($generations);
  const [generationNumber, setGenerationNumber] = useRecoilState($generationNumber);
  const [searchParams, setSearchParams] = useSearchParams();

  const options: SelectOption[] = generations.map((generation) => ({
    label: `${generation.generationNumber}기`,
    value: `${generation.generationNumber}`,
  }));

  const handleChangeGeneration = (selectedOption: SelectOption) => {
    setGenerationNumber(parseInt(selectedOption.value, 10));
    searchParams.delete('page');
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (generations.length && !generationNumber) {
      setGenerationNumber(generations[0].generationNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generationNumber, generations]);

  return (
    <Select
      currentValue={{
        label: `${generationNumber}기`,
        value: `${generationNumber}`,
      }}
      size={SelectSize.xs}
      options={options}
      onChangeOption={(option) => handleChangeGeneration(option)}
    />
  );
};

export default GenerationSelect;
