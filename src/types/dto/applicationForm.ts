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
