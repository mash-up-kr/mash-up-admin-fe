import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ValueOf } from '@/types';
import { Role, Team } from './UserProfile.component';

interface UserProfileContainerProps {
  showBackground: boolean;
}

interface UserProfileRoleLabelProps {
  $role: ValueOf<typeof Role>;
  team: ValueOf<typeof Team>;
}

export const UserProfileContainer = styled.div<UserProfileContainerProps>`
  ${({ theme, showBackground }) => css`
    ${showBackground
      ? css`
          background-color: ${theme.colors.gray10};
          border-radius: 10rem;
        `
      : ''}

    display: inline-flex;
    align-items: center;
    padding: 0.8rem 1.2rem;
    color: ${theme.colors.gray80};
    font-weight: bold;
    font-size: 1.5rem;
    line-height: 1.9rem;
  `}
`;

export const UserProfileRoleLabel = styled.span<UserProfileRoleLabelProps>`
  ${({ $role, team, theme }) => css`
    ${team === Team.mashUp ? theme.userProfile.mashUp[$role] : theme.userProfile.platForm[$role]};

    margin-left: 0.4rem;
    padding: 0.2rem 0.8rem;
    color: ${theme.colors.white};
    font-size: 1rem;
    line-height: 1.3rem;
    border-radius: 10rem;
  `}
`;
