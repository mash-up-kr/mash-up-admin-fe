import React from 'react';
import * as Styled from './ScoreCard.styled';

const ScoreCard = () => {
  return (
    <Styled.Wrapper>
      <Styled.Headline>총 활동 점수</Styled.Headline>
      <Styled.Score>3점</Styled.Score>
    </Styled.Wrapper>
  );
};

export default ScoreCard;
