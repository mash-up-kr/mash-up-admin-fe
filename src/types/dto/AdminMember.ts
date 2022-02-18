import { BaseResponse } from './base';

type Position =
  | 'MASHUP_LEADER'
  | 'MASHUP_SUBLEADER'
  | 'BRANDING_LEADER'
  | 'BRANDING_SUBLEADER'
  | 'BRANDING_STAFF'
  | 'SPRING_LEADER'
  | 'SPRING_SUBLEADER'
  | 'NODE_LEADER'
  | 'NODE_SUBLEADER'
  | 'iOS_LEADER'
  | 'iOS_SUBLEADER'
  | 'ANDROID_LEADER'
  | 'ANDROID_SUBLEADER'
  | 'WEB_LEADER'
  | 'WEB_SUBLEADER'
  | 'DESIGN_LEADER'
  | 'DESIGN_SUBLEADER';

export interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponseSchema {
  accessToken: string;
  adminMember: {
    adminMemberId: number;
    position: Position;
    username: string;
  };
}
export interface LoginResponse extends BaseResponse<LoginResponseSchema> {}

interface MeResponseSchema {
  adminMemberId: number;
  position: Position;
  username: string;
}
export interface MeResponse extends BaseResponse<MeResponseSchema> {}
