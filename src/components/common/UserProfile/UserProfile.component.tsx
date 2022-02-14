import React from 'react';
import { ValueOf } from '@/types';
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
  subLeader: 'SUB LEADER',
  member: 'MEMBER',
} as const;

export interface UserProfileProps {
  team: ValueOf<typeof Team>;
  role: ValueOf<typeof Role>;
  showBackground?: boolean;
}

const UserProfile = ({ team, role, showBackground = true }: UserProfileProps) => {
  return (
    <Styled.UserProfileContainer showBackground={showBackground}>
      <span>{team}</span>
      <Styled.UserProfileRoleLabel team={team} $role={role}>
        {role}
      </Styled.UserProfileRoleLabel>
    </Styled.UserProfileContainer>
  );
};

export default UserProfile;
