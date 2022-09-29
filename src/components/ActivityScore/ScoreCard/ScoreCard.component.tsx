import React from 'react';
import * as Styled from './ScoreCard.styled';

interface ScoreCardProps {
  totalScore: number;
}

const ScoreCard = ({ totalScore }: ScoreCardProps) => {
  return (
    <Styled.Wrapper>
      <Styled.Headline>총 활동 점수</Styled.Headline>
      <Styled.Score>{totalScore}점</Styled.Score>
    </Styled.Wrapper>
  );
};

export default ScoreCard;
