import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { ValueOf } from '@/types';
import { colors } from '@/styles';
import { NavigationSizeType } from './Navigation.component';

interface NavigationContainerProps {
  showBottomBorder: boolean;
}

interface StyledNavigationItemProps {
  size: NavigationSizeType;
  active: boolean;
  inActiveColor: ValueOf<typeof colors>;
}

export const NavigationContainer = styled.nav<NavigationContainerProps>`
  ${({ showBottomBorder, theme }) => css`
    display: flex;

    ${showBottomBorder
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
    letter-spacing: -0.05em;

    ${active
      ? css`
          border-bottom: 0.2rem solid ${theme.colors.purple70};
        `
      : ''};
  `}
`;
