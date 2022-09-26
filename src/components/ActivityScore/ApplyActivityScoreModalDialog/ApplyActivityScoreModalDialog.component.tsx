import React from 'react';
import { useForm } from 'react-hook-form';
import { InputField, RadioButton } from '@/components';

import * as Styled from './ApplyActivityScoreModalDialog.styled';
import { RangeType } from '../constants';
import { getRangeText } from '../utils';
import { InputSize } from '@/components/common/Input/Input.component';

interface ApplyActivityScoreModalDialogProps {
  onClose: () => void;
}

interface FormValues {
  date: string;
  memo: string;
}

const scoreTypes = [
  {
    label: '출결',
    items: [
      { label: '출석', rangeType: RangeType.Normal, range: 0 },
      { label: '지각', rangeType: RangeType.Minus, range: 0.5 },
      { label: '결석', rangeType: RangeType.Minus, range: 1 },
    ],
  },
  {
    label: '활동',
    items: [
      { label: '프로젝트 배포 실패', rangeType: RangeType.Minus, range: 1 },
      { label: '프로젝트 배포 성공', rangeType: RangeType.Plus, range: 1 },
      { label: '전체 세미나 발표', rangeType: RangeType.Plus, range: 1 },
      { label: '매시업 콘텐츠 글 작성', rangeType: RangeType.Plus, range: 0.5 },
      { label: '뭐든준비위원회', rangeType: RangeType.Plus, range: 1 },
    ],
  },
  {
    label: '직위',
    items: [
      { label: '회장', rangeType: RangeType.Minus, range: 100 },
      { label: '부회장', rangeType: RangeType.Plus, range: 100 },
      { label: '스태프', rangeType: RangeType.Plus, range: 99 },
      { label: '프로젝트팀 팀장', rangeType: RangeType.Plus, range: 2 },
      { label: '프로젝트팀 부팀장', rangeType: RangeType.Plus, range: 2 },
    ],
  },
];

const ApplyActivityScoreModalDialog = ({ onClose }: ApplyActivityScoreModalDialogProps) => {
  const { register } = useForm<FormValues>();

  return (
    <Styled.ApplyActivityScoreModalWrapper
      heading="활동점수 적용"
      handleCloseModal={onClose}
      footer={{
        confirmButton: { label: '적용', onClick: onClose },
        cancelButton: { label: '취소', onClick: onClose },
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
                      <RadioButton label={scoreTypeItem.label} />
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
