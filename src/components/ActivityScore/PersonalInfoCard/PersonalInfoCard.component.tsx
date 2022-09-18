import React from 'react';
import * as Styled from './PersonalInfoCard.styled';

const PersonalInfoCard = () => {
  return (
    <Styled.Wrapper>
      <Styled.Headline>인적 정보</Styled.Headline>
      <Styled.Row>
        <Styled.Col>
          <Styled.Label>이름</Styled.Label>
          <Styled.Content>박민수</Styled.Content>
        </Styled.Col>
        <Styled.Col>
          <Styled.Label>플랫폼</Styled.Label>
          <Styled.Content>디자인</Styled.Content>
        </Styled.Col>
      </Styled.Row>
      <Styled.Row>
        <Styled.Col>
          <Styled.Label>아이디</Styled.Label>
          <Styled.Content>MashUp</Styled.Content>
        </Styled.Col>
        <Styled.Col>
          <Styled.Label>기수</Styled.Label>
          <Styled.Content>12기</Styled.Content>
        </Styled.Col>
      </Styled.Row>
    </Styled.Wrapper>
  );
};

export default PersonalInfoCard;
