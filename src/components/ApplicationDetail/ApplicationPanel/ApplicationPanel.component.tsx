import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilCallback } from 'recoil';
import utc from 'dayjs/plugin/utc';
import { useLocation } from 'react-router-dom';
import { Button, DatePicker, Select } from '@/components';
import * as Styled from './ApplicationPanel.styled';
import { ButtonShape, ButtonSize } from '@/components/common/Button/Button.component';
import { TitleWithContent } from '..';
import ApplicationStatusBadge, {
  ApplicationConfirmationStatus,
  ApplicationConfirmationStatusKeyType,
  ApplicationResultStatus,
  ApplicationResultStatusKeyType,
  ApplicationResultStatusType,
} from '@/components/common/ApplicationStatusBadge/ApplicationStatusBadge.component';
import { toUtcFormat, formatDate } from '@/utils/date';
import { SelectOption, SelectSize } from '@/components/common/Select/Select.component';
import { useOnClickOutSide, useToast } from '@/hooks';
import { rangeArray, request } from '@/utils';
import * as api from '@/api';
import {
  ApplicationConfirmationStatusInDto,
  ApplicationRequest,
  ApplicationResultStatusInDto,
  ApplicationUpdateResultByIdRequest,
} from '@/types';
import { $applicationById, $applications } from '@/store';
import { ToastType } from '@/styles';

dayjs.extend(utc);

interface FormValues {
  applicationResultStatus: ApplicationResultStatusKeyType;
  interviewStartedAt: string;
  isEdit: boolean;
}

interface ControlAreaProps {
  confirmationStatus: ApplicationConfirmationStatusKeyType;
  resultStatus: ApplicationResultStatusKeyType;
  interviewDate?: string;
  isLoading?: boolean;
}

const ControlArea = ({
  confirmationStatus,
  resultStatus,
  interviewDate,
  isLoading = false,
}: ControlAreaProps) => {
  const { setValue, getValues, watch, register } = useFormContext<FormValues>();
  const date = getValues('interviewStartedAt');
  const isEdit = watch('isEdit');

  const isInterviewConfirmed = useMemo(
    () =>
      [
        'INTERVIEW_CONFIRM_ACCEPTED',
        'INTERVIEW_CONFIRM_REJECTED',
        'FINAL_CONFIRM_WAITING',
        'FINAL_CONFIRM_ACCEPTED',
        'FINAL_CONFIRM_REJECTED',
      ].some((each) => each === confirmationStatus),
    [confirmationStatus],
  );

  const isScreeningPassed = useMemo(
    () =>
      [
        'SCREENING_PASSED',
        'INTERVIEW_TO_BE_DETERMINED',
        'INTERVIEW_FAILED',
        'INTERVIEW_PASSED',
      ].some((each) => each === resultStatus),
    [resultStatus],
  );

  const [isShowInterviewSchedule, setIsShowInterviewSchedule] = useState(
    resultStatus === ApplicationResultStatusInDto.SCREENING_PASSED,
  );
  const [isDatePickerOpened, setIsDatePickerOpened] = useState(false);
  const outerRef = useRef<HTMLDivElement>(null);
  const selectedApplicationResultStatusRef = useRef<HTMLInputElement>(null);
  const selectedInterviewStartedAtRef = useRef<HTMLInputElement>(null);

  const handleSelectDate = useCallback(
    (clickedDate: Dayjs) => {
      const currentDate = dayjs(date);
      setValue(
        `interviewStartedAt`,
        dayjs(clickedDate).hour(currentDate.hour()).minute(currentDate.minute()).second(0).format(),
      );
      setIsDatePickerOpened(false);
    },
    [date, setValue],
  );

  const handleToggleIsEdit = useCallback(() => {
    setValue('isEdit', !isEdit);
  }, [isEdit, setValue]);

  const handleToggleDatePicker = () => {
    setIsDatePickerOpened((prev) => !prev);
  };

  const handleChangeApplicationResultSelect = useCallback(
    (option: SelectOption) => {
      setValue(`applicationResultStatus`, option.value as ApplicationResultStatusKeyType);
      if (option.value === ApplicationResultStatusInDto.SCREENING_PASSED) {
        setIsShowInterviewSchedule(true);
      } else {
        setIsShowInterviewSchedule(false);
      }
    },
    [setValue],
  );

  const handleChangeTimeSelect = useCallback(
    (option: SelectOption) => {
      setValue(`interviewStartedAt`, option.value);
    },
    [setValue],
  );

  useOnClickOutSide(outerRef, () => setIsDatePickerOpened(false));

  const applicationResultOptions = useMemo(() => {
    const resultOption = Object.values(ApplicationResultStatus).reduce<SelectOption[]>(
      (acc: SelectOption[], cur: ApplicationResultStatusType, index) => [
        ...acc,
        { value: Object.keys(ApplicationResultStatus)[index], label: cur },
      ],
      [],
    );

    if (isScreeningPassed) {
      return resultOption.slice(1, resultOption.length);
    }

    return resultOption.slice(0, 4);
  }, [isScreeningPassed]);

  const timeOptions = useMemo(
    () =>
      rangeArray(14 * 6 + 1).reduce<SelectOption[]>((acc: SelectOption[], cur: number) => {
        const min = (cur % 6) - 1;
        const hour = Math.floor(cur / 6);
        const d = dayjs(date)
          .clone()
          .hour(8 + hour)
          .minute(min * 10)
          .second(0)
          .format();
        return [...acc, { value: d, label: formatDate(d, 'a hh시 mm분') }];
      }, []),
    [date],
  );

  if (isEdit) {
    return (
      <>
        <TitleWithContent title="합격 여부" isActive>
          <Select
            size={SelectSize.md}
            options={applicationResultOptions}
            isFullWidth
            ref={selectedApplicationResultStatusRef}
            onChangeOption={handleChangeApplicationResultSelect}
            defaultValue={applicationResultOptions.find((option) => option.value === resultStatus)}
          />
        </TitleWithContent>
        {isShowInterviewSchedule && (
          <TitleWithContent title="면접 일시" isActive={!isInterviewConfirmed}>
            {/* // TODO:(용재) pointer-events: none; 하긴 했는데 클릭 자체가 실행 안되도록 못하도록 처리해야 함 - onClick 두고 캡쳐링을 막으면 될까.. */}
            <Styled.SelectContainer disabled={isInterviewConfirmed}>
              <div ref={outerRef}>
                <Styled.SelectWrapper
                  onClick={handleToggleDatePicker}
                  isDatePickerOpened={isDatePickerOpened}
                >
                  {formatDate(date, 'YYYY년 M월 D일(ddd)')}
                </Styled.SelectWrapper>
                <Styled.SelectMenu isDatePickerOpened={isDatePickerOpened}>
                  <DatePicker handleSelectDate={handleSelectDate} selectedDate={dayjs(date)} />
                </Styled.SelectMenu>
              </div>
              <Styled.SelectTimeField>
                <Select
                  size={SelectSize.md}
                  options={timeOptions}
                  isFullWidth
                  onChangeOption={handleChangeTimeSelect}
                  disabled={isInterviewConfirmed}
                  defaultValue={timeOptions.find((option) => option.value === dayjs(date).format())}
                  {...register(`interviewStartedAt`, { required: true })}
                  ref={selectedInterviewStartedAtRef}
                />
              </Styled.SelectTimeField>
            </Styled.SelectContainer>
          </TitleWithContent>
        )}
        <Styled.ButtonContainer>
          <Button
            $size={ButtonSize.sm}
            shape={ButtonShape.defaultLine}
            label="취소"
            onClick={handleToggleIsEdit}
          />
          <Button
            type="submit"
            $size={ButtonSize.sm}
            shape={ButtonShape.primary}
            label="저장"
            isLoading={isLoading}
          />
        </Styled.ButtonContainer>
      </>
    );
  }

  return (
    <>
      <TitleWithContent title="합격 여부">
        <ApplicationStatusBadge text={ApplicationResultStatus[resultStatus]} />
      </TitleWithContent>
      {isScreeningPassed && interviewDate && (
        <TitleWithContent
          title="면접 일시"
          isLineThrough={
            confirmationStatus === ApplicationConfirmationStatusInDto.FINAL_CONFIRM_REJECTED
          }
        >
          {formatDate(interviewDate, 'YYYY년 M월 D일(ddd) a hh시 mm분')}
        </TitleWithContent>
      )}
      <Styled.ButtonContainer>
        <Button
          $size={ButtonSize.sm}
          shape={ButtonShape.primaryLine}
          label="수정"
          onClick={handleToggleIsEdit}
        />
      </Styled.ButtonContainer>
    </>
  );
};

export interface ApplicationPanelProps {
  confirmationStatus: ApplicationConfirmationStatusKeyType;
  resultStatus: ApplicationResultStatusKeyType;
  interviewDate?: string;
  applicationId: string;
}

const ApplicationPanel = ({
  confirmationStatus,
  resultStatus,
  interviewDate,
  applicationId,
  ...restProps
}: ApplicationPanelProps) => {
  const { state } = useLocation();
  const { handleAddToast } = useToast();
  const methods = useForm<FormValues>({
    defaultValues: {
      applicationResultStatus: resultStatus,
      interviewStartedAt: interviewDate
        ? dayjs(interviewDate).format()
        : dayjs().add(1, 'd').hour(8).minute(0).second(0).format(),
      isEdit: false,
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit } = methods;

  const handleSubmitUpdateResult = useRecoilCallback(
    ({ refresh }) =>
      async ({ applicationResultStatus, interviewStartedAt }: FormValues) => {
        const requestDto: ApplicationUpdateResultByIdRequest = {
          applicationResultStatus,
          interviewStartedAt: toUtcFormat(interviewStartedAt),
          interviewEndedAt: toUtcFormat(
            dayjs(interviewStartedAt).add(49, 'm').add(59, 's').format(),
          ),
          applicationId,
        };

        if (applicationResultStatus !== ApplicationResultStatusInDto.SCREENING_PASSED) {
          delete requestDto.interviewStartedAt;
          delete requestDto.interviewEndedAt;
        }

        request({
          requestFunc: async () => {
            setIsLoading(true);
            await api.postUpdateResult(requestDto);
          },
          errorHandler: handleAddToast,
          onSuccess: async () => {
            await refresh($applicationById({ applicationId }));
            await refresh($applications(state as ApplicationRequest));
            methods.setValue('isEdit', false);
            handleAddToast({
              type: ToastType.success,
              message: '성공적으로 합격 여부가 변경되었습니다.',
            });
          },
          onCompleted: () => setIsLoading(false),
        });
      },
    [],
  );

  return (
    <FormProvider {...methods}>
      <Styled.ApplicationPanelContainer>
        <h3>작성 및 수정정보</h3>
        <Styled.ApplicationStatusForm onSubmit={handleSubmit(handleSubmitUpdateResult)}>
          <TitleWithContent title="사용자 확인 여부">
            <ApplicationStatusBadge text={ApplicationConfirmationStatus[confirmationStatus]} />
          </TitleWithContent>
          <Styled.Divider />
          <ControlArea
            confirmationStatus={confirmationStatus}
            resultStatus={resultStatus}
            interviewDate={interviewDate}
            isLoading={isLoading}
            {...restProps}
          />
        </Styled.ApplicationStatusForm>
      </Styled.ApplicationPanelContainer>
    </FormProvider>
  );
};

export default ApplicationPanel;
