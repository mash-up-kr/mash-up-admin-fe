import React from 'react';
import { useRecoilCallback, useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import { ApplicationFormSection, ApplicationFormAside } from '@/components';
import * as Styled from './ApplicationFormDetail.styled';

import { ParamId, QuestionKind } from '@/types';

import { $applicationFormDetail } from '@/store/applicationForm';
import { InputSize } from '@/components/common/Input/Input.component';
import * as api from '@/api';

const ApplicationFormDetail = () => {
  const { id } = useParams<ParamId>();

  const [{ questions, name, team, createdAt, createdBy, updatedAt, updatedBy }] = useRecoilState(
    $applicationFormDetail({ id: id ?? '' }),
  );

  const handleRemoveQuestion = useRecoilCallback(() => async () => {
    if (!id) {
      return;
    }

    // TODO:(@mango906): api 요청 완료후 로직 만들어주기
    api.deleteApplicationForm(id);
  });

  return (
    <Styled.ApplicationFormDetailPage>
      <ApplicationFormSection headline="지원서 설문지 상세" />
      <div>
        <article>
          <Styled.Content>
            <span>지원설문지 문서명</span>
            <span>{name}</span>
          </Styled.Content>
          <Styled.QuestionContent>
            {questions.map((question, index) => {
              const readableIndex = index + 1;

              const props = {
                label: `${readableIndex}. ${question.content}`,
                description: question.description,
                disabled: true,
                required: question.required,
              };

              return (
                <li key={question.questionId}>
                  {question.questionType === QuestionKind.multiLineText ? (
                    <Styled.CustomTextarea {...props} placeholder="장문형 텍스트입니다." />
                  ) : (
                    <Styled.CustomInput
                      {...props}
                      $size={InputSize.md}
                      placeholder="단답형 텍스트입니다."
                    />
                  )}
                </li>
              );
            })}
          </Styled.QuestionContent>
        </article>
        <ApplicationFormAside
          platform={team.name}
          createdAt={createdAt}
          createdBy={createdBy}
          updatedAt={updatedAt}
          updatedBy={updatedBy}
          leftActionButton={{
            text: '삭제',
            onClick: handleRemoveQuestion,
          }}
          rightActionButton={{ text: '수정' }}
        />
      </div>
    </Styled.ApplicationFormDetailPage>
  );
};

export default ApplicationFormDetail;
