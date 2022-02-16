export interface Application {
  applicantId: number;
  name: string;
  phoneNumber: string;
  team: string;
  result: {
    interviewStartedAt: string;
    status: string;
  };
  confirmationStatus: string;
}
