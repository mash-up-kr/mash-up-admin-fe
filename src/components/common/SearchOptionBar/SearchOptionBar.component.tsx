import React, { Dispatch, SetStateAction, useLayoutEffect, useMemo, useRef } from 'react';
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
  searchWord: { value: string };
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  filterValues?: ApplicationFilterValuesType;
  setFilterValues?: Dispatch<SetStateAction<ApplicationFilterValuesType>>;
}

const DEFAULT = { label: '전체', value: '' };

const SearchOptionBar = ({
  searchWord,
  handleSubmit,
  filterValues,
  setFilterValues,
}: SearchOptionBarProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleApplicationConfirmStatus = (option: SelectOption) => {
    setFilterValues?.((prev) => ({
      ...prev,
      confirmStatus: option,
    }));
  };

  const handleApplicationResultStatus = (option: SelectOption) => {
    setFilterValues?.((prev) => ({
      ...prev,
      resultStatus: option,
    }));
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
      {filterValues && (
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
        <Input ref={ref} name="searchWord" $size="xs" placeholder="지원서 설문지 문서명 검색" />
        <Styled.SearchButton type="submit" $size={ButtonSize.xs} shape={ButtonShape.default}>
          검색
        </Styled.SearchButton>
      </Styled.SearchInputContainer>
    </Styled.BarContainer>
  );
};

export default SearchOptionBar;
