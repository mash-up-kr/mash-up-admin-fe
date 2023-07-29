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

interface LogoutButtonProps {
  size: NavigationSizeType;
}

export const NavigationContainer = styled.div<NavigationContainerProps>`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: 20rem;
`;

export const NavigationTitle = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.medium14};
    display: flex;
    align-items: center;
    width: 20rem;
    height: 5rem;
    padding: 0 2rem;
    color: ${theme.colors.gray80};
  `}
`;

export const ItemWrapper = styled.div`
  padding: 0 1rem;
`;

export const NavigationItem = styled(Link)<StyledNavigationItemProps>`
  ${({ theme, size, active, inActiveColor }) => css`
    ${theme.navigation.size[size]};
    ${theme.fonts.regular14};

    display: flex;
    align-items: center;
    justify-content: start;
    padding: 10px 12px;
    color: ${active ? theme.colors.purple70 : inActiveColor};
    letter-spacing: -0.08rem;
    border-radius: 10px;

    ${active
      ? css`
          ${theme.fonts.medium14};
          background-color: ${theme.colors.purple10};
        `
      : ''};

    &:hover {
      background-color: ${theme.colors.purple10};
    }
  `}
`;

export const NavigationDivider = styled.hr`
  width: 16rem;
  height: 2px;
  background-color: #f8f9fa;
  border: 0;
`;

export const NavigationIcon = styled.i`
  display: flex;
  width: 24px;
  height: 24px;
  margin-right: 12px;
`;

export const LogoutButton = styled.button<LogoutButtonProps>`
  ${({ theme, size }) => css`
    ${theme.navigation.size[size]};
    ${theme.fonts.regular14};

    display: flex;
    align-items: center;
    justify-content: start;
    padding: 10px 12px;
    color: ${theme.colors.red100};
    letter-spacing: -0.08rem;
    background-color: ${theme.colors.white};
    border-radius: 10px;
  `}
`;
