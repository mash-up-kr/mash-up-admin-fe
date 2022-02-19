export interface ApplicationRequest {
  confirmStatus?: string;
  page?: number;
  resultStatus?: string;
  searchWord?: string;
  size?: number;
  sort?: string;
  teamId?: number;
}

export interface ApplicationResponse {
  applicationId: number;
  applicant: {
    applicantId: number;
    name: string;
    email: string;
    phoneNumber: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
  confirmationStatus: string;
  result: {
    interviewEndedAt: string;
    interviewStartedAt: string;
    status: string;
  };
  team: {
    createdAt: string;
    createdBy: string;
    name: string;
    teamId: number;
    updatedAt: string;
    updatedBy: string;
  };
  createdAt: string;
  updatedAt: string;
}
