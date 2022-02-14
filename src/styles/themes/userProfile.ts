import { css } from '@emotion/react';
import { Role, Team } from '@/components/common/UserProfile/UserProfile.component';
import { colors } from './colors';
import { neverExpected } from '@/utils/errors';

export const userProfile = {
  [Team.mashUp]: {
    [Role.leader]: css`
      background-color: ${colors.red70};
    `,
    [Role.subLeader]: css`
      background-color: ${colors.orange70};
    `,
    [Role.staff]: neverExpected(Role.staff as never),
  },
  [Team.android]: {
    [Role.leader]: css`
      background-color: ${colors.green70};
    `,
    [Role.subLeader]: css`
      background-color: ${colors.blue70};
    `,
    [Role.staff]: neverExpected(Role.staff as never),
  },
  [Team.design]: {
    [Role.leader]: css`
      background-color: ${colors.green70};
    `,
    [Role.subLeader]: css`
      background-color: ${colors.blue70};
    `,
    [Role.staff]: neverExpected(Role.staff as never),
  },
  [Team.ios]: {
    [Role.leader]: css`
      background-color: ${colors.green70};
    `,
    [Role.subLeader]: css`
      background-color: ${colors.blue70};
    `,
    [Role.staff]: neverExpected(Role.staff as never),
  },
  [Team.node]: {
    [Role.leader]: css`
      background-color: ${colors.green70};
    `,
    [Role.subLeader]: css`
      background-color: ${colors.blue70};
    `,
    [Role.staff]: neverExpected(Role.staff as never),
  },
  [Team.spring]: {
    [Role.leader]: css`
      background-color: ${colors.green70};
    `,
    [Role.subLeader]: css`
      background-color: ${colors.blue70};
    `,
    [Role.staff]: neverExpected(Role.staff as never),
  },
  [Team.web]: {
    [Role.leader]: css`
      background-color: ${colors.green70};
    `,
    [Role.subLeader]: css`
      background-color: ${colors.blue70};
    `,
    [Role.staff]: neverExpected(Role.staff as never),
  },
  [Team.branding]: {
    [Role.leader]: css`
      background-color: ${colors.green70};
    `,
    [Role.subLeader]: css`
      background-color: ${colors.blue70};
    `,
    [Role.staff]: css`
      background-color: ${colors.gray70};
    `,
  },
} as const;

export type UserProfileTheme = typeof userProfile;
