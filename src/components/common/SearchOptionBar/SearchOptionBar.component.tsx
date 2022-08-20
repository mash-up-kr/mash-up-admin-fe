import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
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
  searchWord: { value: string };
  showFilterValues?: boolean;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}

const DEFAULT = { label: '전체', value: '' };

const SearchOptionBar = ({
  placeholder,
  searchWord,
  showFilterValues = true,
  handleSubmit,
}: SearchOptionBarProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const ref = useRef<HTMLInputElement>(null);

  const [filterValues, setFilterValues] = useState<ApplicationFilterValuesType>({
    confirmStatus: { label: '', value: '' },
    resultStatus: { label: '', value: '' },
  });

  const handleApplicationConfirmStatus = (option: SelectOption) => {
    setFilterValues?.((prev) => ({
      ...prev,
      confirmStatus: option,
    }));

    if (option.value === DEFAULT.value) {
      searchParams.delete('confirmStatus');
      setSearchParams(searchParams);
      return;
    }

    searchParams.set('confirmStatus', option.value);
    setSearchParams(searchParams);
  };

  const handleApplicationResultStatus = (option: SelectOption) => {
    setFilterValues?.((prev) => ({
      ...prev,
      resultStatus: option,
    }));

    if (option.value === DEFAULT.value) {
      searchParams.delete('confirmStatus');
      setSearchParams(searchParams);
      return;
    }

    searchParams.set('resultStatus', option.value);
    setSearchParams(searchParams);
  };

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.value = searchWord.value;
    }
  }, [searchWord]);

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

  return (
    <Styled.BarContainer onSubmit={handleSubmit}>
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
