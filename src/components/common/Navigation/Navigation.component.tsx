import React, { ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import { ValueOf } from '@/types';
import { colors } from '@/styles';

import * as Styled from './Navigation.styled';
import { ACCESS_TOKEN, PATH } from '@/constants';
import LogoutIcon from '@/assets/svg/logout-24.svg';
import { $me } from '@/store';

interface Menu {
  label: string;
  to: ValueOf<typeof PATH>;
  icon: ReactElement;
}

export interface NavigationItem {
  title: string;
  menus: Menu[];
}

export const NavigationSize = {
  sm: 'sm',
  md: 'md',
} as const;

export type NavigationSizeType = ValueOf<typeof NavigationSize>;

export interface NavigationProps {
  size: NavigationSizeType;
  inActiveColor: ValueOf<typeof colors>;
  items: NavigationItem[];
  showBottomBorder?: boolean;
}

const Navigation = ({ size, inActiveColor, items, showBottomBorder = true }: NavigationProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const resetMe = useResetRecoilState($me);

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    resetMe();
    navigate(PATH.LOGIN);
  };

  return (
    <Styled.NavigationContainer showBottomBorder={showBottomBorder}>
      {items.map((item) => (
        <>
          <Styled.NavigationTitle>{item.title}</Styled.NavigationTitle>
          {item.menus.map((menu, menuIdx) => {
            const isActive = pathname
              .split('/')
              .some((pathNameItem) => `/${pathNameItem}` === menu.to);

            return (
              <>
                <Styled.ItemWrapper>
                  <Styled.NavigationItem
                    key={menu.to}
                    size={size}
                    to={menu.to}
                    inActiveColor={inActiveColor}
                    active={isActive}
                  >
                    <Styled.NavigationIcon>{menu.icon}</Styled.NavigationIcon>
                    {menu.label}
                  </Styled.NavigationItem>
                </Styled.ItemWrapper>
                {item.menus.length === menuIdx + 1 && <Styled.NavigationDivider />}
              </>
            );
          })}
        </>
      ))}
      <Styled.ItemWrapper>
        <Styled.LogoutButton size={size} onClick={handleLogout}>
          <Styled.NavigationIcon>
            <LogoutIcon />
          </Styled.NavigationIcon>
          로그아웃
        </Styled.LogoutButton>
      </Styled.ItemWrapper>
    </Styled.NavigationContainer>
  );
};

export default Navigation;
