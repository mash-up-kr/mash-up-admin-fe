import React from 'react';
import { TeamNavigationTabs } from '@/components';
import * as Styled from './ApplicationFormList.styled';

const ApplicationFormList = () => {
  return (
    <Styled.PageWrapper>
      <Styled.Heading>지원서 설문지 내역</Styled.Heading>
      <TeamNavigationTabs />
    </Styled.PageWrapper>
  );
};

export default ApplicationFormList;
