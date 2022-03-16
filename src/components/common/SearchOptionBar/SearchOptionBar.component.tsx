import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
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

interface SearchOptionBarProps {
  searchWord: { value: string };
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  handleChangeApplicationConfirmationStatus?: (option: SelectOption) => void;
  handleChangeApplicationResultStatus?: (option: SelectOption) => void;
}

const DEFAULT = { label: '전체', value: 'DEFAULT' };

const SearchOptionBar = ({
  searchWord,
  handleSubmit,
  handleChangeApplicationConfirmationStatus,
  handleChangeApplicationResultStatus,
}: SearchOptionBarProps) => {
  const [currentParam, setCurrentParam] = useState('');
  const [searchParams] = useSearchParams();
  const [applicationConfirmationStatusValue, setApplicationConfirmationStatusValue] =
    useState<SelectOption>();
  const [applicationResultStatusValue, setApplicationResultStatusValue] = useState<SelectOption>();

  const handleApplicationConfirmStatus = (option: SelectOption) => {
    setApplicationConfirmationStatusValue(option);
  };

  const handleApplicationResultStatus = (option: SelectOption) => {
    setApplicationResultStatusValue(option);
  };

  useEffect(() => {
    if (currentParam !== searchParams.get('team')) {
      handleApplicationConfirmStatus(DEFAULT);
      handleApplicationResultStatus(DEFAULT);

      setCurrentParam(searchParams.get('team') || '');
    }
  }, [searchParams]);

  useEffect(() => {
    if (applicationConfirmationStatusValue && handleChangeApplicationConfirmationStatus) {
      handleChangeApplicationConfirmationStatus(applicationConfirmationStatusValue);
    }
  }, [applicationConfirmationStatusValue]);

  useEffect(() => {
    if (applicationResultStatusValue && handleChangeApplicationResultStatus) {
      handleChangeApplicationResultStatus(applicationResultStatusValue);
    }
  }, [applicationResultStatusValue]);

  const ref = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.value = searchWord.value;
    }
  }, [searchWord]);

  const applicationConfirmationStatusOptions = useMemo(
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
      {handleChangeApplicationConfirmationStatus && handleChangeApplicationResultStatus && (
        <Styled.SelectContainer>
          <div>
            <div>합격여부</div>
            <Select
              size={SelectSize.xs}
              options={applicationResultStatusOptions}
              onChangeOption={handleApplicationConfirmStatus}
              defaultValue={DEFAULT}
              currentValue={applicationConfirmationStatusValue}
            />
          </div>
          <div>
            <div>사용자 확인여부</div>
            <Select
              size={SelectSize.xs}
              options={applicationConfirmationStatusOptions}
              onChangeOption={handleApplicationResultStatus}
              defaultValue={DEFAULT}
              currentValue={applicationResultStatusValue}
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
