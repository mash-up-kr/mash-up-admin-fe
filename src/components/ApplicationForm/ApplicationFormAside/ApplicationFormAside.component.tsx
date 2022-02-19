import React from 'react';

import { Button, UserProfile } from '@/components';
import * as Styled from './ApplicationFormAside.styled';
import { splitMemberPosition } from '@/components/common/UserProfile/UserProfile.component';
import { ButtonShape, ButtonSize } from '@/components/common/Button/Button.component';
import Preview from '@/assets/svg/preview-20.svg';
import { formatDate } from '@/utils';
import { MemberPositionType } from '@/types';

export interface ApplicationFormAsideProps {
  platform: React.ReactNode;
  createdAt: string;
  createdBy?: MemberPositionType;
  updatedAt?: string;
  updatedBy?: MemberPositionType;
  leftActionButton: {
    text: string;
    type?: 'submit' | 'reset' | 'button';
  };
  rightActionButton: {
    text: string;
    type?: 'submit' | 'reset' | 'button';
  };
}

const ApplicationFormAside = ({
  platform,
  createdAt,
  updatedAt,
  createdBy,
  updatedBy,
  leftActionButton,
  rightActionButton,
}: ApplicationFormAsideProps) => {
  return (
    <Styled.ApplicationFormAside>
      <Styled.Headline>작성 및 수정정보</Styled.Headline>
      <Styled.ContentContainer>
        <Styled.Label>플랫폼</Styled.Label>
        <Styled.Content>{platform}</Styled.Content>
      </Styled.ContentContainer>
      {createdBy && (
        <Styled.ContentContainer>
          <Styled.Label>최초 작성자</Styled.Label>
          <Styled.Content>
            <UserProfile
              team={splitMemberPosition(createdBy)[0]}
              role={splitMemberPosition(createdBy)[1]}
              showBackground={false}
              removePadding
            />
          </Styled.Content>
        </Styled.ContentContainer>
      )}
      <Styled.ContentContainer>
        <Styled.Label>작성일시</Styled.Label>
        <Styled.Content>{formatDate(createdAt, 'YYYY년MM월DD일 hh시mm분')}</Styled.Content>
      </Styled.ContentContainer>
      {updatedBy && (
        <Styled.ContentContainer>
          <Styled.Label>마지막 수정자</Styled.Label>
          <Styled.Content>
            <UserProfile
              team={splitMemberPosition(updatedBy)[0]}
              role={splitMemberPosition(updatedBy)[1]}
              showBackground={false}
              removePadding
            />
          </Styled.Content>
        </Styled.ContentContainer>
      )}
      {updatedAt && (
        <Styled.ContentContainer>
          <Styled.Label>수정일시</Styled.Label>
          <Styled.Content>{formatDate(updatedAt, 'YYYY년MM월DD일 hh시mm분')}</Styled.Content>
        </Styled.ContentContainer>
      )}
      <Styled.Divider />
      <Styled.ButtonContainer>
        <Button
          Icon={Preview}
          $size={ButtonSize.sm}
          shape={ButtonShape.defaultLine}
          label="미리보기"
        />
        <Button
          $size={ButtonSize.sm}
          shape={ButtonShape.defaultLine}
          label={leftActionButton.text}
          type={rightActionButton.type}
        />
        <Button
          $size={ButtonSize.sm}
          shape={ButtonShape.primary}
          label={rightActionButton.text}
          type={rightActionButton.type}
        />
      </Styled.ButtonContainer>
    </Styled.ApplicationFormAside>
  );
};

export default ApplicationFormAside;
