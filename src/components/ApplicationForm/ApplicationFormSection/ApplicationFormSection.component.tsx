import React from 'react';
import { BackButton } from '@/components';
import * as Styled from './ApplicationFormSection.styled';
import { PATH } from '@/constants';
import { useHistory } from '@/hooks';

interface ApplicationFormSectionProps {
  headline: string;
}

const ApplicationFormSection = ({ headline }: ApplicationFormSectionProps) => {
  const { handleGoBack } = useHistory();

  return (
    <section>
      <BackButton label="목록 돌아가기" onClick={() => handleGoBack(PATH.APPLICATION_FORM)} />
      <Styled.Headline>{headline}</Styled.Headline>
    </section>
  );
};

export default ApplicationFormSection;
