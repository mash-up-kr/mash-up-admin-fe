import { ValueOf } from '@/types';

export const MemberPosition = {
  mashupLeader: 'MASHUP_LEADER',
  mashupSubLeader: 'MASHUP_SUBLEADER',
  brandingLeader: 'BRANDING_LEADER',
  brandingSubLeader: 'BRANDING_SUBLEADER',
  brandingMember: 'BRANDING_MEMBER',
  springLeader: 'SPRING_LEADER',
  springSubLeader: 'SPRING_SUBLEADER',
  springHelper: 'SPRING_HELPER',
  nodeLeader: 'NODE_LEADER',
  nodeSubLeader: 'NODE_SUBLEADER',
  nodeHelper: 'NODE_HELPER',
  iosLeader: 'iOS_LEADER',
  iosSubLeader: 'iOS_SUBLEADER',
  iosHelper: 'iOS_HELPER',
  androidLeader: 'ANDROID_LEADER',
  androidSubLeader: 'ANDROID_SUBLEADER',
  androidHelper: 'ANDROID_HELPER',
  webLeader: 'WEB_LEADER',
  webSubLeader: 'WEB_SUBLEADER',
  webHelper: 'WEB_HELPER',
  designLeader: 'DESIGN_LEADER',
  designSubLeader: 'DESIGN_SUBLEADER',
  designHelper: 'DESIGN_HELPER',
} as const;

export type MemberPositionType = ValueOf<typeof MemberPosition>;

interface Member {
  adminMemberId: number;
  phoneNumber: string;
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
