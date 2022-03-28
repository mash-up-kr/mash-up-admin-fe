import React from 'react';
import { MemberPositionType, ValueOf } from '@/types';
import * as Styled from './UserProfile.styled';

// TODO:(@mango906): 추후 서버에서 내려주는 값에 따라 value값 변경 필요
export const Team = {
  mashUp: 'MASHUP',
  branding: 'BRANDING',
  design: 'DESIGN',
  android: 'ANDROID',
  ios: 'iOS',
  web: 'WEB',
  node: 'NODE',
  spring: 'SPRING',
} as const;

// TODO:(@mango906): 추후 서버에서 내려주는 값에 따라 value값 변경 필요
export const Role = {
  leader: 'LEADER',
  subLeader: 'SUBLEADER',
  member: 'MEMBER',
  helper: 'HELPER',
} as const;

export const splitMemberPosition = (position: MemberPositionType) => {
  return position.split('_') as [TeamType, RoleType];
};

export type TeamType = ValueOf<typeof Team>;
export type RoleType = ValueOf<typeof Role>;

export interface UserProfileProps {
  team: TeamType;
  role: RoleType;
  showBackground?: boolean;
  removePadding?: boolean;
}

const UserProfile = ({
  team,
  role,
  showBackground = true,
  removePadding = false,
}: UserProfileProps) => {
  return (
    <Styled.UserProfileContainer showBackground={showBackground} removePadding={removePadding}>
      <span>{team}</span>
      <Styled.UserProfileRoleLabel team={team} $role={role}>
        {role}
      </Styled.UserProfileRoleLabel>
    </Styled.UserProfileContainer>
  );
};

export default UserProfile;
