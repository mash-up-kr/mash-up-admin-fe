import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BackButton } from '@/components';
import * as Styled from './CreateSchedule.styled';
import { useHistory } from '@/hooks';
import { PATH } from '@/constants';
import { ScheduleTemplate } from '@/components/Schedule';

const CreateSchedule = () => {
  const { handleGoBack } = useHistory();

  const methods = useForm({});

  return (
    <FormProvider {...methods}>
      <Styled.CreateSchedulePage>
        <BackButton label="목록 돌아가기" onClick={() => handleGoBack(PATH.SCHEDULE)} />
        <Styled.Headline>스케줄</Styled.Headline>
        <ScheduleTemplate />
      </Styled.CreateSchedulePage>
    </FormProvider>
  );
};

export default CreateSchedule;
