import React, { FormEvent, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input, Select } from '@/components';
import { ButtonSize, ButtonShape } from '@/components/common/Button/Button.component';
import * as Styled from './SearchOptionBar.styled';
import { SelectOption, SelectSize } from '../Select/Select.component';
import {
  ApplicationConfirmationStatus,
  ApplicationConfirmationStatusKeyType,
  ApplicationResultStatus,
  ApplicationResultStatusKeyType,
} from '../ApplicationStatusBadge/ApplicationStatusBadge.component';

export interface ApplicationFilterValuesType {
  confirmStatus: SelectOption;
  resultStatus: SelectOption;
}

interface SearchOptionBarProps {
  placeholder?: string;
  showFilterValues?: boolean;
}

const DEFAULT = { label: '전체', value: '' };

const SearchOptionBar = ({ placeholder, showFilterValues = true }: SearchOptionBarProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const ref = useRef<HTMLInputElement>(null);

  const confirmStatus = searchParams.get('confirmStatus') || '';
  const resultStatus = searchParams.get('resultStatus') || '';
  const searchWord = searchParams.get('searchWord') || '';

  const [filterValues, setFilterValues] = useState<ApplicationFilterValuesType>({
    confirmStatus: { label: '', value: '' },
    resultStatus: { label: '', value: '' },
  });

  const [searchKeyword, setSearchKeyword] = useState<{ value: string }>({ value: '' });

  const handleApplicationConfirmStatus = (option: SelectOption) => {
    if (option.value === DEFAULT.value) {
      searchParams.delete('confirmStatus');
      setSearchParams(searchParams);
      return;
    }

    searchParams.set('confirmStatus', option.value);
    setSearchParams(searchParams);
  };

  const handleApplicationResultStatus = (option: SelectOption) => {
    if (option.value === DEFAULT.value) {
      searchParams.delete('resultStatus');
      setSearchParams(searchParams);
      return;
    }

    searchParams.set('resultStatus', option.value);
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

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.value = searchKeyword.value;
    }
  }, [searchKeyword]);

  const applicationConfirmStatusOptions = useMemo(
    () => [
      DEFAULT,
      ...Object.keys(ApplicationConfirmationStatus).reduce<SelectOption[]>(
        (acc, cur) => [
          ...acc,
          {
            label: ApplicationConfirmationStatus[cur as ApplicationConfirmationStatusKeyType],
            value: cur,
          },
        ],
        [],
      ),
    ],
    [],
  );

  const applicationResultStatusOptions = useMemo(
    () => [
      DEFAULT,
      ...Object.keys(ApplicationResultStatus).reduce<SelectOption[]>(
        (acc, cur) => [
          ...acc,
          {
            label: ApplicationResultStatus[cur as ApplicationResultStatusKeyType],
            value: cur,
          },
        ],
        [],
      ),
    ],
    [],
  );

  useEffect(() => {
    const confirmStatusLabel =
      applicationConfirmStatusOptions.find((option) => option.value === confirmStatus)?.label ?? '';

    const resultStatusLabel =
      applicationResultStatusOptions.find((option) => option.value === resultStatus)?.label ?? '';

    setFilterValues({
      confirmStatus: { label: confirmStatusLabel, value: confirmStatus },
      resultStatus: { label: resultStatusLabel, value: resultStatus },
    });
  }, [
    applicationConfirmStatusOptions,
    applicationResultStatusOptions,
    confirmStatus,
    resultStatus,
  ]);

  useEffect(() => {
    setSearchKeyword({ value: searchWord });
  }, [searchWord]);

  return (
    <Styled.BarContainer onSubmit={handleSearch}>
      {showFilterValues && (
        <Styled.SelectContainer>
          <div>
            <div>합격여부</div>
            <Select
              size={SelectSize.xs}
              options={applicationResultStatusOptions}
              onChangeOption={handleApplicationResultStatus}
              defaultValue={DEFAULT}
              currentValue={filterValues.resultStatus}
            />
          </div>
          <div>
            <div>사용자 확인여부</div>
            <Select
              size={SelectSize.xs}
              options={applicationConfirmStatusOptions}
              onChangeOption={handleApplicationConfirmStatus}
              defaultValue={DEFAULT}
              currentValue={filterValues.confirmStatus}
            />
          </div>
        </Styled.SelectContainer>
      )}
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
