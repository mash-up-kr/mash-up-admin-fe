import React from 'react';
import { getScoreRangeType } from '../utils';
import * as Styled from './ScoreCard.styled';

interface ScoreCardProps {
  totalScore: number;
}

const ScoreCard = ({ totalScore }: ScoreCardProps) => {
  return (
    <Styled.Wrapper>
      <Styled.Headline>총 활동점수</Styled.Headline>
      <Styled.Score type={getScoreRangeType(totalScore)}>{totalScore}점</Styled.Score>
    </Styled.Wrapper>
  );
};

export default ScoreCard;
