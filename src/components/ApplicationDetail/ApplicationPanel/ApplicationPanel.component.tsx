import React, { useMemo, useRef, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilCallback } from 'recoil';
import { Button, DatePicker, SelectField } from '@/components';
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
import { formatDate } from '@/utils/date';
import { SelectOption, SelectSize } from '@/components/common/Select/Select.component';
import { useOnClickOutSide } from '@/hooks';
import { rangeArray } from '@/utils';
import { postUpdateResult } from '@/api';
import { ApplicationUpdateResultByIdRequest } from '@/types';
import { $modalByStorage, ModalKey } from '@/store';

interface FormValues {
  applicationResultStatus: ApplicationResultStatusKeyType;
  interviewStartedAt: string;
}

interface ControlAreaProps {
  confirmationStatus: ApplicationConfirmationStatusKeyType;
  resultStatus: ApplicationResultStatusKeyType;
  interviewDate?: string;
}

const ControlArea = ({ confirmationStatus, resultStatus, interviewDate }: ControlAreaProps) => {
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
  const isShowInterviewSchedule = useMemo(
    () =>
      ['SCREENING_PASSED', 'INTERVIEW_FAILED', 'INTERVIEW_PASSED'].some(
        (each) => each === resultStatus,
      ),
    [resultStatus],
  );

  const { setValue } = useFormContext<FormValues>();

  const [isEdit, setIsEdit] = useState(false);
  const outerRef = useRef<HTMLDivElement>(null);

  const [isDatePickerOpened, setIsDatePickerOpened] = useState(false);
  const [date, setDate] = useState<Dayjs>(dayjs(interviewDate));
  const selectedApplicationResultStatusRef = useRef<HTMLSelectElement>(null);
  const handleSelectDate = (clickedDate: Dayjs) => {
    setDate(clickedDate);
    setIsDatePickerOpened(false);
  };

  const handleToggleIsEdit = () => {
    setIsEdit((prev) => {
      if (prev) setDate(dayjs(interviewDate));
      return !prev;
    });
  };

  const handleToggleDatePicker = () => {
    setIsDatePickerOpened((prev) => !prev);
  };

  const handleChangeApplicationResultSelect = (option: SelectOption) => {
    setValue(`applicationResultStatus`, option.value as ApplicationResultStatusKeyType);
  };

  const handleChangeTimeSelect = (option: SelectOption) => {
    setValue(`interviewStartedAt`, option.value);
  };

  useOnClickOutSide(outerRef, () => setIsDatePickerOpened(false));

  const applicationResultOptions = useMemo(
    () =>
      Object.values(ApplicationResultStatus).reduce<SelectOption[]>(
        (acc: SelectOption[], cur: ApplicationResultStatusType, index) => {
          return [...acc, { value: Object.keys(ApplicationResultStatus)[index], label: cur }];
        },
        [],
      ),
    [],
  );

  const timeOptions = useMemo(
    () =>
      rangeArray(14 * 6).reduce<SelectOption[]>((acc: SelectOption[], cur: number) => {
        const min = cur % 6;
        const hour = Math.floor(cur / 6);
        const d = date
          .clone()
          .hour(8 + hour)
          .minute(min * 10)
          .format();
        return [...acc, { value: d, label: formatDate(d, 'a hh시 mm분') }];
      }, []),
    [date],
  );

  if (isEdit) {
    return (
      <>
        <TitleWithContent title="합격 여부" isActive>
          <SelectField
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
                <Styled.Select onClick={handleToggleDatePicker}>
                  {formatDate(date.format(), 'YYYY년 M월 D일(ddd)')}
                </Styled.Select>
                <Styled.SelectMenu isDatePickerOpened={isDatePickerOpened}>
                  <DatePicker handleSelectDate={handleSelectDate} selectedDate={date} />
                </Styled.SelectMenu>
              </div>
              <Styled.SelectTimeField
                size={SelectSize.md}
                options={timeOptions}
                isFullWidth
                onChangeOption={handleChangeTimeSelect}
                disabled={isInterviewConfirmed}
                defaultValue={timeOptions.find((option) => option.value === dayjs(date).format())}
              />
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
          <Button type="submit" $size={ButtonSize.sm} shape={ButtonShape.primary} label="저장" />
        </Styled.ButtonContainer>
      </>
    );
  }

  return (
    <>
      <TitleWithContent title="합격 여부">
        <ApplicationStatusBadge text={ApplicationResultStatus[resultStatus]} />
      </TitleWithContent>
      {isShowInterviewSchedule && (
        <TitleWithContent title="면접 일시" isLineThrough={isInterviewConfirmed}>
          {formatDate(date.format(), 'YYYY년 M월 D일(ddd) a hh시 mm분')}
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
  const methods = useForm<FormValues>({});
  const { handleSubmit } = methods;

  const handleSubmitUpdateResult = useRecoilCallback(
    ({ set, snapshot }) =>
      async (data: FormValues) => {
        const requestDto: ApplicationUpdateResultByIdRequest = {
          ...data,
          applicationId,
        };

        const modal = snapshot.getLoadable($modalByStorage(ModalKey.alertModalDialog)).contents;

        try {
          await postUpdateResult(requestDto);
        } catch (e) {
          // TODO:(용재) 메시지 확정되면 추가
          set($modalByStorage(ModalKey.alertModalDialog), {
            ...modal,
            props: {
              heading: '에러가 발생했습니다.',
              paragraph: '다시 시도해주세요.',
              cancelButtonLabel: '취소',
              confirmButtonLabel: '닫기',
            },
            isOpen: true,
          });
        }
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
            {...restProps}
          />
        </Styled.ApplicationStatusForm>
      </Styled.ApplicationPanelContainer>
    </FormProvider>
  );
};

export default ApplicationPanel;
