import React, { useLayoutEffect, useRef } from 'react';
import { Input } from '@/components';
import { ButtonSize, ButtonShape } from '@/components/common/Button/Button.component';
import * as Styled from './SearchOptionBar.styled';

interface SearchOptionBarProps {
  searchWord: { value: string };
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}

const SearchOptionBar = ({ searchWord, handleSubmit }: SearchOptionBarProps) => {
  const ref = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.value = searchWord.value;
    }
  }, [searchWord]);

  return (
    <Styled.BarContainer onSubmit={handleSubmit}>
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
