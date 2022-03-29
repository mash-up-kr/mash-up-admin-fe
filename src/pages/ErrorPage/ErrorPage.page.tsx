import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common';
import { ButtonShape } from '@/components/common/Button/Button.component';
import * as Styled from './ErrorPage.styled';
import { PATH, PathValueType } from '@/constants';
import MinsourDori from '@/assets/svg/minsour-dori-248.svg';

interface ErrorPageProps {
  path: PathValueType;
}

const ErrorPage = ({ path }: ErrorPageProps) => {
  const navigate = useNavigate();

  const handleNavigateApplicationList = () => {
    navigate(PATH.APPLICATION);
  };

  return (
    <Styled.ErrorPageWrapper>
      <Styled.ErrorPageContainer>
        <MinsourDori />
        <Styled.Title>
          {path === PATH.NOT_FOUND
            ? '길을 잘못 들었구나.. 돌아가..'
            : '접근 권한이 없는 팀이구나.. 돌아가..'}
        </Styled.Title>
        <Button
          shape={ButtonShape.primary}
          label="지원서내역으로 돌아가기"
          onClick={handleNavigateApplicationList}
        />
      </Styled.ErrorPageContainer>
    </Styled.ErrorPageWrapper>
  );
};

export default ErrorPage;
