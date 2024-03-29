import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import unescape from 'lodash-es/unescape';
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
import { ApplicationByIdResponseData, Question } from '@/types';
import { PATH } from '@/constants';
import * as api from '@/api';
import { useHistory } from '@/hooks';

const ApplicationDetailView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const data = useRecoilValue<ApplicationByIdResponseData>(
    $applicationById({ applicationId: id as string }),
  );
  const { handleGoBack } = useHistory();

  useEffect(() => {
    (async () => {
      try {
        if (!id) {
          throw Error();
        }
        if (!data) {
          await api.getApplicationById({ applicationId: id });
        }
      } catch (e) {
        navigate(PATH.FORBIDDEN);
      }
    })();
  }, [data, id, navigate]);

  return (
    <Styled.ApplicationDetailViewPage>
      <section>
        <BackButton label="목록 돌아가기" onClick={() => handleGoBack(PATH.APPLICATION)} />
        <Styled.Headline>지원설문지 상세</Styled.Headline>
      </section>
      <div>
        <article>
          <Styled.ApplicantInfo>
            <h3>인적정보</h3>
            <section>
              <div>
                <TitleWithContent title="이름">{unescape(data.applicant.name)}</TitleWithContent>
                <TitleWithContent title="이메일">{data.applicant.email}</TitleWithContent>
                <TitleWithContent title="거주지역">
                  {unescape(data.applicant.residence)}
                </TitleWithContent>
              </div>
              <div>
                <TitleWithContent title="전화번호">{data.applicant.phoneNumber}</TitleWithContent>
                <TitleWithContent title="생년월일">{data.applicant.birthdate}</TitleWithContent>
                <TitleWithContent title="소속">
                  {unescape(data.applicant.department)}
                </TitleWithContent>
              </div>
            </section>
            <Styled.Divider />
            <section>
              <div>
                <TitleWithContent title="지원플랫폼">{data.team.name}</TitleWithContent>
              </div>
              <div>
                <TitleWithContent title="지원일시">
                  {formatDate(data.submittedAt, 'YYYY년 M월 D일(ddd)')}
                </TitleWithContent>
              </div>
            </section>
          </Styled.ApplicantInfo>
          <Styled.QuestionList>
            <h3>질문 리스트</h3>
            <section>
              {data?.questions.map((each: Question, index) => (
                <ApplicationQnAItem {...each} answer={data?.answers[index]} key={each.questionId} />
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
          <MessageListPanel application={data} />
        </Styled.Aside>
      </div>
    </Styled.ApplicationDetailViewPage>
  );
};

export default ApplicationDetailView;
