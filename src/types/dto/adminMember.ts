import { ValueOf } from '@/types';

export const MemberPosition = {
  mashupLeader: 'MASHUP_LEADER',
  mashupSubLeader: 'MASHUP_SUBLEADER',
  brandingLeader: 'BRANDING_LEADER',
  brandingSubLeader: 'BRANDING_SUBLEADER',
  brandingMember: 'BRANDING_MEMBER',
  springLeader: 'SPRING_LEADER',
  springSubLeader: 'SPRING_SUBLEADER',
  nodeLeader: 'NODE_LEADER',
  nodeSubLeader: 'NODE_SUBLEADER',
  iosLeader: 'iOS_LEADER',
  iosSubLeader: 'iOS_SUBLEADER',
  androidLeader: 'ANDROID_LEADER',
  androidSubLeader: 'ANDROID_SUBLEADER',
  webLeader: 'WEB_LEADER',
  webSubLeader: 'WEB_SUBLEADER',
  designLeader: 'DESIGN_LEADER',
  designSubLeader: 'DESIGN_SUBLEADER',
} as const;

export type MemberPositionType = ValueOf<typeof MemberPosition>;

interface Member {
  adminMemberId: number;
  position?: MemberPositionType;
  username: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  adminMember: Member;
}

export interface MeResponse extends Member {}
