import { css } from '@emotion/react';
import { Role } from '@/components/common/UserProfile/UserProfile.component';
import { colors } from './colors';

export const userProfile = {
  mashUp: {
    [Role.leader]: css`
      background-color: ${colors.red70};
    `,
    [Role.subLeader]: css`
      background-color: ${colors.orange70};
    `,
  },
  platform: {
    [Role.leader]: css`
      background-color: ${colors.green70};
    `,
    [Role.subLeader]: css`
      background-color: ${colors.blue70};
    `,
  },
  branding: {
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
