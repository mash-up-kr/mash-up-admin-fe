import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '@/components';
import * as Styled from './ApplicationFormSection.styled';
import { PATH } from '@/constants';

interface ApplicationFormSectionProps {
  headline: string;
}

const ApplicationFormSection = ({ headline }: ApplicationFormSectionProps) => {
  const navigate = useNavigate();

  return (
    <section>
      <BackButton label="목록 돌아가기" onClick={() => navigate(PATH.APPLICATION_FORM)} />
      <Styled.Headline>{headline}</Styled.Headline>
    </section>
  );
};

export default ApplicationFormSection;
