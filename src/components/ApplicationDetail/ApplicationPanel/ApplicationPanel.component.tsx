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
  ApplicationConfirmationStatusType,
  ApplicationResultStatus,
  ApplicationResultStatusType,
} from '@/components/common/ApplicationStatusBadge/ApplicationStatusBadge.component';
import { convertToFormatDate, convertToFormatTime } from '@/utils/date';
import { SelectOption, SelectSize } from '@/components/common/Select/Select.component';
import { useOnClickOutSide } from '@/hooks';
import { rangeArray } from '@/utils';
import { postUpdateResult } from '@/api';
import { ApplicationUpdateResultByIdRequest } from '@/types';
import { ERROR } from '@/components/common/AlertModalDialog/AlertModalDialog.component';
import { $modalByStorage, ModalKey } from '@/store';

interface FormValues {
  applicationResultStatus: ApplicationResultStatusType;
  interviewStartedAt: string;
}

export interface ApplicationPanelProps {
  confirmationStatus: ApplicationConfirmationStatusType;
  resultStatus: ApplicationResultStatusType;
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
    setValue(`applicationResultStatus`, option.value as ApplicationResultStatusType);
  };

  const handleChangeTimeSelect = (option: SelectOption) => {
    setValue(`interviewStartedAt`, option.value);
  };

  useOnClickOutSide(outerRef, () => setIsDatePickerOpened(false));

  const isNoInterviewScheduled =
    confirmationStatus === ApplicationConfirmationStatus.INTERVIEW_CONFIRM_REJECTED;

  const normal = (
    <>
      <TitleWithContent title="합격 여부">
        <ApplicationStatusBadge text={resultStatus} />
      </TitleWithContent>
      {interviewDate && (
        <TitleWithContent title="면접 일시" isLineThrough={isNoInterviewScheduled}>
          {convertToFormatDate(date.format())} {convertToFormatTime(date.format())}
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

  const ApplicationResultOptions = useMemo(
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
      rangeArray(14).reduce<SelectOption[]>((acc: SelectOption[], cur: number) => {
        const d = date
          .clone()
          .hour(8 + cur)
          .minute(0)
          .format();
        return [...acc, { value: d, label: convertToFormatTime(d) }];
      }, []),
    [date],
  );

  const edit = (
    <>
      <TitleWithContent title="합격 여부" isActive>
        <SelectField
          size={SelectSize.md}
          options={ApplicationResultOptions}
          isFullWidth
          ref={selectedApplicationResultStatusRef}
          onChange={handleChangeApplicationResultSelect}
        />
      </TitleWithContent>
      {interviewDate && (
        <TitleWithContent title="면접 일시" isLineThrough={isNoInterviewScheduled} isActive>
          <Styled.SelectContainer disabled={isNoInterviewScheduled}>
            <div ref={outerRef}>
              <Styled.Select onClick={handleToggleDatePicker}>
                {convertToFormatDate(date.format())}
              </Styled.Select>
              <Styled.SelectMenu isDatePickerOpened={isDatePickerOpened}>
                <DatePicker handleSelectDate={handleSelectDate} selectedDate={date} />
              </Styled.SelectMenu>
            </div>
            <SelectField
              size={SelectSize.md}
              options={timeOptions}
              isFullWidth
              onChange={handleChangeTimeSelect}
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
        <Button
          $size={ButtonSize.sm}
          shape={ButtonShape.primary}
          label="저장"
          onClick={handleSubmit(handleSubmitUpdateResult)}
        />
      </Styled.ButtonContainer>
    </>
  );

  return (
    <Styled.ApplicationPanelContainer>
      <h3>작성 및 수정정보</h3>
      <Styled.ApplicationStatusContainer>
        <TitleWithContent title="사용자 확인 여부">
          <ApplicationStatusBadge text={confirmationStatus} />
        </TitleWithContent>
        <Styled.Divider />
        {isEdit ? edit : normal}
      </Styled.ApplicationStatusContainer>
    </Styled.ApplicationPanelContainer>
  );
};

export default ApplicationPanel;
