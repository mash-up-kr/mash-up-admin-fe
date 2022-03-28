import { css } from '@emotion/react';
import { colors } from '.';

// TODO:(용재) 추후 원인 파악
const Role = {
  leader: 'LEADER',
  subLeader: 'SUBLEADER',
  member: 'MEMBER',
} as const;

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
    [Role.member]: css`
      background-color: ${colors.gray70};
    `,
  },
  helper: css`
    background-color: ${colors.yellow70};
  `,
} as const;

export type UserProfileTheme = typeof userProfile;
