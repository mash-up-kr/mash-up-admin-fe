import React from 'react';
import { useLocation } from 'react-router-dom';
import { ValueOf } from '@/types';
import { colors } from '@/styles';

import * as Styled from './Navigation.styled';
import { PATH } from '@/constants';

interface Menu {
  label: string;
  to: ValueOf<typeof PATH>;
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

  return (
    <Styled.NavigationContainer showBottomBorder={showBottomBorder}>
      {items.map((item, itemIdx) => (
        <>
          <Styled.NavigationTitle>{item.title}</Styled.NavigationTitle>
          {item.menus.map((menu, menuIdx) => {
            const isActive = pathname
              .split('/')
              .some((pathNameItem) => `/${pathNameItem}` === menu.to);

            return (
              <>
                <div style={{ padding: '0 1rem' }}>
                  <Styled.NavigationItem
                    key={menu.to}
                    size={size}
                    to={menu.to}
                    inActiveColor={inActiveColor}
                    active={isActive}
                  >
                    <Styled.NavigationItemWrapper />
                    {menu.label}
                  </Styled.NavigationItem>
                </div>
                {item.menus.length === menuIdx + 1 && items.length !== itemIdx + 1 && (
                  <Styled.NavigationDivider />
                )}
              </>
            );
          })}
        </>
      ))}
    </Styled.NavigationContainer>
  );
};

export default Navigation;
