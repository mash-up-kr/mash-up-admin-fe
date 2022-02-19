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
