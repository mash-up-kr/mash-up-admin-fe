import React from 'react';

import { Button, UserProfile } from '@/components';
import * as Styled from './ApplicationFormAside.styled';
import { Role, Team } from '@/components/common/UserProfile/UserProfile.component';
import { ButtonShape, ButtonSize } from '@/components/common/Button/Button.component';
import Preview from '@/assets/svg/preview-20.svg';
import { Team as TeamType } from '@/types';
import { formatDate } from '@/utils';

interface ApplicationFormAsideProps {
  team: TeamType;
  createdAt: string;
  updatedAt: string;
}

const ApplicationFormAside = ({ team, createdAt, updatedAt }: ApplicationFormAsideProps) => {
  return (
    <Styled.ApplicationFormAside>
      <Styled.Headline>작성 및 수정정보</Styled.Headline>
      <Styled.ContentContainer>
        <Styled.Label>플랫폼</Styled.Label>
        <Styled.Content>{team.name}</Styled.Content>
      </Styled.ContentContainer>
      <Styled.ContentContainer>
        <Styled.Label>최초 작성자</Styled.Label>
        <Styled.Content>
          <UserProfile team={Team.design} role={Role.leader} showBackground={false} removePadding />
        </Styled.Content>
      </Styled.ContentContainer>
      <Styled.ContentContainer>
        <Styled.Label>작성일시</Styled.Label>
        <Styled.Content>{formatDate(createdAt, 'YYYY년MM월DD일 hh시mm분')}</Styled.Content>
      </Styled.ContentContainer>
      <Styled.ContentContainer>
        <Styled.Label>마지막 수정자</Styled.Label>
        <Styled.Content>
          <UserProfile team={Team.design} role={Role.leader} showBackground={false} removePadding />
        </Styled.Content>
      </Styled.ContentContainer>
      <Styled.ContentContainer>
        <Styled.Label>수정일시</Styled.Label>
        <Styled.Content>{formatDate(updatedAt, 'YYYY년MM월DD일 hh시mm분')}</Styled.Content>
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
        <Button $size={ButtonSize.sm} shape={ButtonShape.primary} label="저장" type="submit" />
      </Styled.ButtonContainer>
    </Styled.ApplicationFormAside>
  );
};

export default ApplicationFormAside;
