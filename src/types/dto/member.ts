export interface MemberRequest {
  generationNumber: number;
  page?: number;
  size?: number;
  platform?: string;
  sort?: string;
}

export interface MemberResponse {
  memberId: number;
  name: string;
  platform: string;
  score: number;
  identification: string;
}
