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

export interface ApplicationForm {
  name: string;
  questions: Question[];
  teamId: number;
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
  createdBy: string;
  name: string;
  questions: {
    content: string;
    description: string;
    maxContentLength: number;
    questionId: number;
    questionType: string;
    required: boolean;
  }[];
  team: {
    name: string;
    teamId: number;
  };
  updatedAt: string;
  updatedBy: string;
}
