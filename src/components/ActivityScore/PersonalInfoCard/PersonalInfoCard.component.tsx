import React from 'react';
import * as Styled from './PersonalInfoCard.styled';

interface PersonalInfoCardProps {
  name: string;
  platform: string;
  identification: string;
  generationNumber: number;
}

const PersonalInfoCard = ({
  name,
  platform,
  identification,
  generationNumber,
}: PersonalInfoCardProps) => {
  return (
    <Styled.Wrapper>
      <Styled.Headline>인적 정보</Styled.Headline>
      <Styled.Row>
        <Styled.Col>
          <Styled.Label>이름</Styled.Label>
          <Styled.Content>{name}</Styled.Content>
        </Styled.Col>
        <Styled.Col>
          <Styled.Label>플랫폼</Styled.Label>
          <Styled.Content>{platform}</Styled.Content>
        </Styled.Col>
      </Styled.Row>
      <Styled.Row>
        <Styled.Col>
          <Styled.Label>아이디</Styled.Label>
          <Styled.Content>{identification}</Styled.Content>
        </Styled.Col>
        <Styled.Col>
          <Styled.Label>기수</Styled.Label>
          <Styled.Content>{generationNumber}기</Styled.Content>
        </Styled.Col>
      </Styled.Row>
    </Styled.Wrapper>
  );
};

export default PersonalInfoCard;
