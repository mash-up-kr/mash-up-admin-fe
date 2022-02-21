import React from 'react';
import { Input } from '@/components';
import { ButtonSize, ButtonShape } from '@/components/common/Button/Button.component';
import * as Styled from './SearchOptionBar.styled';

interface SearchOptionBarProps {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}

const SearchOptionBar = ({ handleSubmit }: SearchOptionBarProps) => {
  return (
    <Styled.BarContainer onSubmit={handleSubmit}>
      <div />
      <Styled.SearchInputContainer>
        <Input name="searchWord" $size="xs" placeholder="이름, 전화번호 검색" />
        <Styled.SearchButton type="submit" $size={ButtonSize.xs} shape={ButtonShape.default}>
          검색
        </Styled.SearchButton>
      </Styled.SearchInputContainer>
    </Styled.BarContainer>
  );
};

export default SearchOptionBar;
