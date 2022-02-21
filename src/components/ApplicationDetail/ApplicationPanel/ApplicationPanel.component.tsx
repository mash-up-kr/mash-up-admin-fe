import React, { useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilCallback, useRecoilState } from 'recoil';
import { Button, DatePicker, SelectField } from '@/components';
import * as Styled from './ApplicationPanel.styled';
import { ButtonShape, ButtonSize } from '@/components/common/Button/Button.component';
import { TitleWithContent } from '..';
import ApplicationStatusBadge, {
  ApplicationConfirmationStatus,
  ApplicationConfirmationStatusKeyType,
  ApplicationConfirmationStatusType,
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
import { ERROR } from '@/components/common/AlertModalDialog/AlertModalDialog.component';
import { $modalByStorage, ModalKey } from '@/store';

interface FormValues {
  applicationResultStatus: ApplicationResultStatusKeyType;
  interviewStartedAt: string;
}

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
}: ApplicationPanelProps) => {
  const { handleSubmit, setValue } = useForm<FormValues>({});

  const [isEdit, setIsEdit] = useState(false);
  const [isDatePickerOpened, setIsDatePickerOpened] = useState(false);
  const [date, setDate] = useState<Dayjs>(
    dayjs(interviewDate).hour(0).minute(0).second(0).millisecond(0),
  );
  const [modal, setModal] = useRecoilState($modalByStorage(ModalKey.alertModalDialog));

  const selectedApplicationResultStatusRef = useRef<HTMLSelectElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  const handleSubmitUpdateResult = useRecoilCallback(
    () => async (data: FormValues) => {
      const requestDto: ApplicationUpdateResultByIdRequest = {
        ...data,
        applicationId,
      };

      try {
        await postUpdateResult(requestDto);
      } catch (e) {
        // TODO:(용재) 메시지 확정되면 추가
        setModal({
          ...modal,
          props: ERROR,
          isOpen: true,
        });
      }
    },
    [],
  );

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

  const isNoInterviewScheduled = confirmationStatus === 'INTERVIEW_CONFIRM_REJECTED';

  const normal = (
    <>
      <TitleWithContent title="합격 여부">
        <ApplicationStatusBadge
          text={ApplicationResultStatus[resultStatus] as ApplicationResultStatusType}
        />
      </TitleWithContent>
      {interviewDate && (
        <TitleWithContent title="면접 일시" isLineThrough={isNoInterviewScheduled}>
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

  const edit = (
    <>
      <TitleWithContent title="합격 여부" isActive>
        <SelectField
          size={SelectSize.md}
          options={applicationResultOptions}
          isFullWidth
          ref={selectedApplicationResultStatusRef}
          onChangeOption={handleChangeApplicationResultSelect}
        />
      </TitleWithContent>
      {interviewDate && (
        <TitleWithContent title="면접 일시" isLineThrough={isNoInterviewScheduled} isActive>
          <Styled.SelectContainer disabled={isNoInterviewScheduled}>
            <div ref={outerRef}>
              <Styled.Select onClick={handleToggleDatePicker}>
                {formatDate(date.format(), 'YYYY년 M월 D일(ddd)')}
              </Styled.Select>
              <Styled.SelectMenu isDatePickerOpened={isDatePickerOpened}>
                <DatePicker handleSelectDate={handleSelectDate} selectedDate={date} />
              </Styled.SelectMenu>
            </div>
            <Styled.SelectDateField
              size={SelectSize.md}
              options={timeOptions}
              isFullWidth
              onChangeOption={handleChangeTimeSelect}
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

  return (
    <Styled.ApplicationPanelContainer>
      <h3>작성 및 수정정보</h3>
      <Styled.ApplicationStatusContainer onSubmit={handleSubmit(handleSubmitUpdateResult)}>
        <TitleWithContent title="사용자 확인 여부">
          <ApplicationStatusBadge
            text={
              ApplicationConfirmationStatus[confirmationStatus] as ApplicationConfirmationStatusType
            }
          />
        </TitleWithContent>
        <Styled.Divider />
        {isEdit ? edit : normal}
      </Styled.ApplicationStatusContainer>
    </Styled.ApplicationPanelContainer>
  );
};

export default ApplicationPanel;
