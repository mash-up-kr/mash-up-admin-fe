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

export interface Login {
  code: string;
  data: {
    accessToken: string;
    adminMember: {
      adminMemberId: number;
      position: Position;
      username: string;
    };
  };
  message: string;
  page: {
    number: number;
    size: number;
    totalCount: number;
  };
}

export interface LoginParams {
  username: string;
  password: string;
}

export interface Me {
  code: string;
  data: {
    adminMemberId: number;
    position: Position;
    username: string;
  };
  message: string;
  page: {
    number: number;
    size: number;
    totalCount: number;
  };
}
