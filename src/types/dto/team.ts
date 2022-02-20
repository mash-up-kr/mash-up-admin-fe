import { MemberPositionType } from './adminMember';

export interface Team {
  createdAt: string;
  createdBy: MemberPositionType;
  name: string;
  teamId: number;
  updatedAt: string;
  updatedBy: MemberPositionType;
}

export type TeamResponse = Team[];
