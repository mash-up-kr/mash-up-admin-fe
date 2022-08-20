import React from 'react';
import { useLocation } from 'react-router-dom';
import { ValueOf } from '@/types';
import { colors } from '@/styles';

import * as Styled from './Navigation.styled';
import { PATH } from '@/constants';

export interface NavigationItem {
  label: string;
  to: ValueOf<typeof PATH>;
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
      {items.map((item) => {
        const isActive = pathname.split('/').some((pathNameItem) => `/${pathNameItem}` === item.to);

        return (
          <Styled.NavigationItem
            key={item.to}
            size={size}
            to={item.to}
            inActiveColor={inActiveColor}
            active={isActive}
          >
            {item.label}
          </Styled.NavigationItem>
        );
      })}
    </Styled.NavigationContainer>
  );
};

export default Navigation;
