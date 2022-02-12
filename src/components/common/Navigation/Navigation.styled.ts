import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { ValueOf } from '@/types';
import { colors } from '@/styles';
import { NavigationSizeType } from './Navigation.component';

interface NavigationContainerProps {
  showBorder: boolean;
}

interface StyledNavigationItemProps {
  size: NavigationSizeType;
  active: boolean;
  inActiveColor: ValueOf<typeof colors>;
}

export const NavigationContainer = styled.nav<NavigationContainerProps>`
  ${({ showBorder, theme }) => css`
    display: flex;

    ${showBorder
      ? css`
          border-bottom: 0.1rem solid ${theme.colors.gray30};
        `
      : ''}
  `}
`;

export const NavigationItem = styled(Link)<StyledNavigationItemProps>`
  ${({ theme, size, active, inActiveColor }) => css`
    ${theme.navigation.size[size]};
    ${theme.fonts.bold16};

    display: flex;
    align-items: center;
    justify-content: center;
    color: ${active ? theme.colors.purple70 : inActiveColor};

    ${active
      ? css`
          border-bottom: 0.2rem solid ${theme.colors.purple70};
        `
      : ''}
  `}
`;
