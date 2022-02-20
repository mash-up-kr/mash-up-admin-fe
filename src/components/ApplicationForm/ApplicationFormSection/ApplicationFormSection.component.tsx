import React from 'react';
import { BackButton } from '@/components';
import * as Styled from './ApplicationFormSection.styled';

interface ApplicationFormSectionProps {
  headline: string;
}

const ApplicationFormSection = ({ headline }: ApplicationFormSectionProps) => {
  return (
    <section>
      <BackButton label="목록 돌아가기" />
      <Styled.Headline>{headline}</Styled.Headline>
    </section>
  );
};

export default ApplicationFormSection;
