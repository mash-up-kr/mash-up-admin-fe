import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilCallback, useSetRecoilState } from 'recoil';

import { InputField, RadioButtonField } from '@/components';

import * as Styled from './ApplyActivityScoreModalDialog.styled';
import { RangeType, ScoreType } from '../../ActivityScore/constants';
import { getRangeText } from '../../ActivityScore/utils';
import { InputSize } from '@/components/common/Input/Input.component';
import { ValueOf } from '@/types';
import { request, formatDate } from '@/utils';
import * as api from '@/api';
import { useToast } from '@/hooks';
import { $modalByStorage, ModalKey } from '@/store';
import { $memberDetail } from '@/store/member';
import { ToastType } from '@/styles';

interface FormValues {
  date: string;
  memo: string;
  scoreType: ValueOf<typeof ScoreType>;
}

const scoreTypes = [
  {
    label: '출결',
    items: [
      { value: ScoreType.ATTENDANCE, label: '출석', rangeType: RangeType.Normal, range: 0 },
      { value: ScoreType.LATE, label: '지각', rangeType: RangeType.Minus, range: 0.5 },
      { value: ScoreType.ABSENT, label: '결석', rangeType: RangeType.Minus, range: 1 },
    ],
  },
  {
    label: '활동',
    items: [
      {
        value: ScoreType.DEPLOY_FAILURE,
        label: '프로젝트 배포 실패',
        rangeType: RangeType.Minus,
        range: 1,
      },
      {
        value: ScoreType.DEPLOY_SUCCESS,
        label: '프로젝트 배포 성공',
        rangeType: RangeType.Plus,
        range: 1,
      },
      {
        value: ScoreType.SEMINAR_PRESENTATION,
        label: '전체 세미나 발표',
        rangeType: RangeType.Plus,
        range: 1,
      },
      {
        value: ScoreType.MASHUP_CONTENT_WRITE,
        label: '매시업 콘텐츠 글 작성',
        rangeType: RangeType.Plus,
        range: 0.5,
      },
      {
        value: ScoreType.HACKATHON_COMMITTEE,
        label: '뭐든준비위원회',
        rangeType: RangeType.Plus,
        range: 1,
      },
    ],
  },
  {
    label: '직위',
    items: [
      { value: ScoreType.MASHUP_LEADER, label: '회장', rangeType: RangeType.Plus, range: 100 },
      { value: ScoreType.MASHUP_SUBLEADER, label: '부회장', rangeType: RangeType.Plus, range: 100 },
      { value: ScoreType.MASHUP_STAFF, label: '스태프', rangeType: RangeType.Plus, range: 99 },
      {
        value: ScoreType.PROJECT_LEADER,
        label: '프로젝트팀 팀장',
        rangeType: RangeType.Plus,
        range: 2,
      },
      {
        value: ScoreType.PROJECT_SUBLEADER,
        label: '프로젝트팀 부팀장',
        rangeType: RangeType.Plus,
        range: 2,
      },
    ],
  },
];

export interface ApplyActivityScoreModalDialogProps {
  generationNumber: number;
  memberId: number;
}

const ApplyActivityScoreModalDialog = ({
  generationNumber,
  memberId,
}: ApplyActivityScoreModalDialogProps) => {
  const { handleAddToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleApplyActivityScoreModal = useSetRecoilState(
    $modalByStorage(ModalKey.applyActivityScoreModalDialog),
  );

  const methods = useForm<FormValues>();
  const { handleSubmit, register, control } = methods;

  const handleCloseModal = () =>
    handleApplyActivityScoreModal({ key: ModalKey.applyActivityScoreModalDialog, isOpen: false });

  const handleAddScore = useRecoilCallback(
    ({ refresh }) =>
      async ({ date, memo, scoreType }: FormValues) => {
        const formattedDate = formatDate(date, 'YYYY-MM-DD');

        request({
          requestFunc: async () => {
            setIsLoading(true);

            await api.postScoreHistoryAdd({
              date: formattedDate,
              memo,
              scoreType,
              generationNumber,
              memberId,
            });
          },
          errorHandler: handleAddToast,
          onSuccess: async () => {
            handleCloseModal();
            handleAddToast({
              type: ToastType.success,
              message: '활동점수 히스토리가 추가되었습니다.',
            });
            refresh(
              $memberDetail({
                generationNumber,
                memberId,
              }),
            );
          },
          onCompleted: () => {
            setIsLoading(false);
          },
        });
      },
  );

  return (
    <Styled.ApplyActivityScoreModalWrapper
      heading="활동점수 적용"
      handleCloseModal={handleCloseModal}
      footer={{
        confirmButton: {
          label: '적용',
          onClick: handleSubmit(handleAddScore),
          isLoading,
        },
        cancelButton: { label: '취소', onClick: handleCloseModal },
      }}
    >
      <Styled.ModalInner>
        <Styled.ScoreSection>
          <Styled.ScoreSectionLabel>
            활동점수 리스트
            <Styled.RequiredDot />
          </Styled.ScoreSectionLabel>
          {scoreTypes.map((scoreType) => {
            return (
              <React.Fragment key={scoreType.label}>
                <Styled.Label>{scoreType.label}</Styled.Label>
                <Styled.RadioButtonGroup>
                  {scoreType.items.map((scoreTypeItem) => (
                    <Styled.RadioButtonGroupItem key={scoreTypeItem.label}>
                      <RadioButtonField
                        {...register('scoreType', { required: true })}
                        label={scoreTypeItem.label}
                        value={scoreTypeItem.value}
                      />
                      <Styled.ScoreText rangeType={scoreTypeItem.rangeType}>
                        {getRangeText(scoreTypeItem.range, scoreTypeItem.rangeType)}
                      </Styled.ScoreText>
                    </Styled.RadioButtonGroupItem>
                  ))}
                </Styled.RadioButtonGroup>
              </React.Fragment>
            );
          })}
        </Styled.ScoreSection>
        <Styled.Divider />
        <Styled.InputSection>
          <Styled.StyledDatePickerField
            control={control}
            $size={InputSize.md}
            label="날짜"
            placeholder="내용을 입력해주세요"
            required
            {...register('date', { required: true })}
          />
          <InputField
            {...register('memo')}
            fill
            label="메모"
            $size={InputSize.md}
            placeholder="내용을 입력해주세요"
          />
        </Styled.InputSection>
      </Styled.ModalInner>
    </Styled.ApplyActivityScoreModalWrapper>
  );
};

export default ApplyActivityScoreModalDialog;
