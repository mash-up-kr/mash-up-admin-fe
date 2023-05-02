import React from 'react';
import { Editor, TeamNavigationTabs } from '@/components';
import * as Styled from './UpdatePlatformRecruit.styled';

const UpdatePlatformRecruit = () => {
  return (
    <Styled.PageWrapper>
      <Styled.Heading>리쿠르트 모집공고 수정</Styled.Heading>
      <TeamNavigationTabs />
      <Styled.EditorWrapper>
        <Editor />
      </Styled.EditorWrapper>
    </Styled.PageWrapper>
  );
};

export default UpdatePlatformRecruit;
