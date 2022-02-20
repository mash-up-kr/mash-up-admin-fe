import React from 'react';
import * as Styled from './Loading.styled';

const Loading = () => {
  return (
    <Styled.LoadingWrapper>
      <Styled.Spinner />
    </Styled.LoadingWrapper>
  );
};

export default Loading;
