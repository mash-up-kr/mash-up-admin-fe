import { MemberPositionType, Team, ValueOf } from '@/types';

export const QuestionKind = {
  multiLineText: 'MULTI_LINE_TEXT',
  singleLineText: 'SINGLE_LINE_TEXT',
} as const;

export type QuestionKindType = ValueOf<typeof QuestionKind>;
export interface Question {
  content: string;
  description: string;
  maxContentLength: number | null;
  questionType: QuestionKindType;
  required: boolean;
  questionId?: string;
}

export interface ApplicationFormRequest {
  page?: number;
  searchWord?: string;
  size?: number;
  sort?: string;
  teamId?: number;
}

export interface ApplicationFormResponse {
  applicationFormId: number;
  createdAt: string;
  createdBy: MemberPositionType;
  name: string;
  questions: Question[];
  team: Team;
  updatedAt: string;
  updatedBy: MemberPositionType;
}

export interface ApplicationFormCreateRequest {
  name: string;
  questions: Question[];
  teamId: number;
}

export interface ApplicationFormUpdateRequest {
  name: string;
  questions: Question[];
}
