import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { BackButton } from '@/components';
import * as Styled from './ApplicationDetailView.styled';
import { formatDate } from '@/utils/date';
import {
  ApplicationPanel,
  ApplicationQnAItem,
  MessageListPanel,
  TitleWithContent,
} from '@/components/ApplicationDetail';
import { $applicationById } from '@/store';
import { ApplicationByIdResponseData } from '@/types';
import { ApplicationQnAItemProps } from '@/components/ApplicationDetail/ApplicationQnAItem/ApplicationQnAItem.component';

const ApplicationDetailView = () => {
  const { id } = useParams();
  const data = useRecoilValue<ApplicationByIdResponseData>(
    $applicationById({ applicationId: id as string }),
  );

  return (
    <Styled.ApplicationDetailViewPage>
      <section>
        <BackButton label="목록 돌아가기" />
        <Styled.Headline>지원설문지 상세</Styled.Headline>
      </section>
      <div>
        <article>
          <Styled.ApplicantInfo>
            <h3>인적정보</h3>
            <section>
              <div>
                <TitleWithContent title="이름">{data.applicant.name}</TitleWithContent>
                <TitleWithContent title="지원 플랫폼">{data.team.name}</TitleWithContent>
              </div>
              <div>
                <TitleWithContent title="전화번호">{data.applicant.phoneNumber}</TitleWithContent>
                <TitleWithContent title="지원일시">
                  {formatDate(data.applicant.updatedAt, 'YYYY년 M월 D일(ddd)')}
                </TitleWithContent>
              </div>
            </section>
          </Styled.ApplicantInfo>
          <Styled.QuestionList>
            <h3>질문 리스트</h3>
            <section>
              {data?.questions.map((each: ApplicationQnAItemProps) => (
                <ApplicationQnAItem {...each} key={each.questionId} />
              ))}
            </section>
          </Styled.QuestionList>
        </article>
        <Styled.Aside>
          <ApplicationPanel
            confirmationStatus={data.confirmationStatus}
            resultStatus={data.result.status}
            interviewDate={data.result.interviewStartedAt}
            applicationId={id as string}
          />
          <MessageListPanel smsRequests={data.smsRequests} id={id as string} />
        </Styled.Aside>
      </div>
    </Styled.ApplicationDetailViewPage>
  );
};

export default ApplicationDetailView;
