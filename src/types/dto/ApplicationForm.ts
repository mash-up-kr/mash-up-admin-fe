import { ValueOf } from '@/types';

export const QuestionType = {
  multiLineText: 'MULTI_LINE_TEXT',
  singleLineText: 'SINGLE_LINE_TEXT',
} as const;

export interface Question {
  content: string;
  description: string;
  maxContentLength: number;
  questionType: ValueOf<typeof QuestionType>;
  required: boolean;
}

export interface Team {
  createdAt: string;
  createdBy: string;
  name: string;
  teamId: number;
  updatedAt: string;
  updatedBy: string;
}

export interface ApplicationFormResponse {
  applicationFormId: number;
  createdAt: string;
  createdBy: string;
  name: string;
  questions: Question[];
  team: Team;
  updatedAt: string;
  updatedBy: string;
}

export interface CreateApplicationFormRequest {
  name: string;
  questions: Question[];
  teamId: number;
}
