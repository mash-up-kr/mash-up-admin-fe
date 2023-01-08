import React, { FormEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input, Select } from '@/components';
import { ButtonSize, ButtonShape } from '@/components/common/Button/Button.component';
import * as Styled from './SearchOptionBar.styled';
import { SelectOption, SelectSize } from '../Select/Select.component';

export interface ApplicationFilterValuesType {
  confirmStatus: SelectOption;
  resultStatus: SelectOption;
}

export interface SearchOptionBarFilter {
  title: string;
  key: string;
  options: SelectOption[];
  defaultOption?: SelectOption;
}

interface SearchOptionBarProps {
  placeholder?: string;
  filters?: SearchOptionBarFilter[];
}

const SearchOptionBar = ({ placeholder, filters }: SearchOptionBarProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const ref = useRef<HTMLInputElement>(null);

  const searchWord = searchParams.get('searchWord') || '';

  const [searchKeyword, setSearchKeyword] = useState<{ value: string }>({ value: '' });

  const handleChangeFilter = (selectedOption: SelectOption, filter: SearchOptionBarFilter) => {
    const { key, defaultOption } = filter;

    if (!!defaultOption && selectedOption.value === defaultOption.value) {
      searchParams.delete(key);
      setSearchParams(searchParams);

      return;
    }

    searchParams.set(key, selectedOption.value);
    setSearchParams(searchParams);
  };

  const handleSearch = (
    e: { target: { searchWord: { value: string } } } & FormEvent<HTMLFormElement>,
  ) => {
    const { value } = e.target.searchWord;

    e.preventDefault();

    if (!value) {
      searchParams.delete('searchWord');
      setSearchParams(searchParams);

      return;
    }

    searchParams.set('searchWord', value);
    setSearchParams(searchParams);
  };

  const defaultValue = (filter: SearchOptionBarFilter) => {
    const searchParam = searchParams.get(filter.key);

    if (!searchParam) {
      return filter.options?.[0];
    }

    return filter.options.find((option) => option.value === searchParam);
  };

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.value = searchKeyword.value;
    }
  }, [searchKeyword]);

  useEffect(() => {
    setSearchKeyword({ value: searchWord });
  }, [searchWord]);

  return (
    <Styled.BarContainer onSubmit={handleSearch}>
      <Styled.SelectContainer>
        {filters?.map((filter) => (
          <div>
            <div>{filter.title}</div>
            <Select
              size={SelectSize.xs}
              options={filter.options}
              onChangeOption={(option) => handleChangeFilter(option, filter)}
              defaultValue={defaultValue(filter)}
            />
          </div>
        ))}
      </Styled.SelectContainer>

      <div />
      <Styled.SearchInputContainer>
        <Input ref={ref} name="searchWord" $size="xs" placeholder={placeholder} />
        <Styled.SearchButton type="submit" $size={ButtonSize.xs} shape={ButtonShape.default}>
          검색
        </Styled.SearchButton>
      </Styled.SearchInputContainer>
    </Styled.BarContainer>
  );
};

export default SearchOptionBar;
