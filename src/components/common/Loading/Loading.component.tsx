import React from 'react';
import { colors } from '@/styles';
import { ValueOf } from '@/types';
import * as Styled from './Loading.styled';

interface LoadingProps {
  dimmedColor: ValueOf<typeof colors>;
  spinnerColor: ValueOf<typeof colors>;
}

const Loading = ({ dimmedColor, spinnerColor }: LoadingProps) => {
  return (
    <Styled.LoadingWrapper dimmedColor={dimmedColor}>
      <Styled.Spinner spinnerColor={spinnerColor} />
    </Styled.LoadingWrapper>
  );
};

export default Loading;
