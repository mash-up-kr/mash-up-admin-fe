import React from 'react';
import { Button, UserProfile } from '@/components';
import * as Styled from './CreateApplicationFormAside.styled';
import { Role, Team } from '@/components/common/UserProfile/UserProfile.component';
import { ButtonShape, ButtonSize } from '@/components/common/Button/Button.component';
import Preview from '@/assets/svg/preview-20.svg';

// TODO: (@mango906): api 연동할 떄 props도 정의해주기
const CreateApplicationFormAside = () => {
  return (
    <Styled.CreateApplicationFormAside>
      <Styled.Headline>작성 및 수정정보</Styled.Headline>
      <Styled.ContentContainer>
        <Styled.Label>최초 작성자</Styled.Label>
        <Styled.Content>
          <UserProfile team={Team.design} role={Role.leader} showBackground={false} removePadding />
        </Styled.Content>
      </Styled.ContentContainer>
      <Styled.ContentContainer>
        <Styled.Label>작성일시</Styled.Label>
        <Styled.Content>2022년 3월 2일 오후 8시 30분</Styled.Content>
      </Styled.ContentContainer>
      <Styled.ContentContainer>
        <Styled.Label>마지막 수정자</Styled.Label>
        <Styled.Content>
          <UserProfile
            team={Team.design}
            role={Role.subLeader}
            showBackground={false}
            removePadding
          />
        </Styled.Content>
      </Styled.ContentContainer>
      <Styled.ContentContainer>
        <Styled.Label>수정일시</Styled.Label>
        <Styled.Content>2022년 3월 2일 오후 8시 30분</Styled.Content>
      </Styled.ContentContainer>
      <Styled.Divider />
      <Styled.ButtonContainer>
        <Button
          Icon={Preview}
          $size={ButtonSize.sm}
          shape={ButtonShape.defaultLine}
          label="미리보기"
        />
        <Button $size={ButtonSize.sm} shape={ButtonShape.defaultLine} label="취소" />
        <Button $size={ButtonSize.sm} shape={ButtonShape.primary} label="저장" />
      </Styled.ButtonContainer>
    </Styled.CreateApplicationFormAside>
  );
};

export default CreateApplicationFormAside;
