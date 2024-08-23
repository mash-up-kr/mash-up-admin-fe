import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface StyledNavigationItemProps {
  active: boolean;
  isAllAltText?: boolean;
}

export const Tabs = styled.nav`
  ${({ theme }) => css`
    display: flex;
    gap: 0.8rem;
    margin-bottom: 2rem;
    border-bottom: 0.1rem solid ${theme.colors.gray30};
  `}
`;

export const Tab = styled.button<StyledNavigationItemProps>`
  ${({ theme, active, isAllAltText }) => css`
    ${theme.fonts.regular16};

    display: flex;
    align-items: center;
    justify-content: center;
    width: ${isAllAltText ? '12rem' : '8rem'};
    height: 4rem;
    color: ${active ? theme.colors.purple70 : theme.colors.gray50};
    letter-spacing: -0.08rem;
    background-color: transparent;

    ${active &&
    css`
      ${theme.fonts.bold16};
      border-bottom: 0.2rem solid ${theme.colors.purple70};
    `};
  `}
`;
