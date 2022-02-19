import React from 'react';
import { ApplicationFormSection } from '@/components';
import * as Styled from './ApplicationFormDetail.styled';
import { InputSize } from '@/components/common/Input/Input.component';

const ApplicationFormDetail = () => {
  return (
    <Styled.ApplicationFormDetailPage>
      <ApplicationFormSection headline="지원서 설문지 상세" />
      <article>
        <Styled.Content>
          <span>지원설문지 문서명</span>
          <span>매시업 12기 디자인팀 지원설문_최종</span>
        </Styled.Content>
        <Styled.QuestionContent>
          <li>
            <Styled.CustomTextarea
              label="매시업에 지원하게 된 이유가 뭔가요?(200자 이내)"
              description="설명을 입력해주세요(선택사항입니다.)"
              placeholder="장문형 텍스트입니다."
              disabled
            />
          </li>
          <li>
            <Styled.CustomInput
              $size={InputSize.md}
              label="자신을 드러낼 수 있는 개인 블로그나 노션, Github 링크, 포트폴리오 등을 자유롭게 입력해주세요."
              description="설명을 입력해주세요(선택사항입니다.)"
              placeholder="단답형 텍스트입니다."
              disabled
            />
          </li>
        </Styled.QuestionContent>
      </article>
    </Styled.ApplicationFormDetailPage>
  );
};

export default ApplicationFormDetail;
