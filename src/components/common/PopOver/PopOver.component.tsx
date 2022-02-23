import React, { ReactNode, useState } from 'react';
import { useResetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import BubbleArrowUp from '@/assets/svg/bubble-arrow-up-16.svg';
import LogoutIcon from '@/assets/svg/logout-16.svg';
import * as Styled from './PopOver.styled';
import { ACCESS_TOKEN, PATH } from '@/constants';
import { $me } from '@/store';

export interface PopOverProps {
  children: ReactNode;
}

// TODO:(용재) 일반화된 컴포넌트로 리팩토링 해야 함
const PopOver = ({ children }: PopOverProps) => {
  const navigate = useNavigate();
  const resetMe = useResetRecoilState($me);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOpen = (set: boolean) => {
    setIsOpen(set);
  };

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    resetMe();
    navigate(PATH.LOGIN);
  };

  return (
    <Styled.PopOverWrapper
      isOpen={isOpen}
      onMouseOver={() => handleToggleOpen(true)}
      onMouseLeave={() => handleToggleOpen(false)}
    >
      {children}
      <Styled.BlankArea />
      {isOpen && (
        <Styled.Content>
          <BubbleArrowUp />
          <Styled.Select onClick={handleLogout}>
            <LogoutIcon />
            로그아웃
          </Styled.Select>
        </Styled.Content>
      )}
    </Styled.PopOverWrapper>
  );
};

export default PopOver;
