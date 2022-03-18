export interface Team {
  createdAt: string;
  createdBy: string;
  name: string;
  teamId: number;
  updatedAt: string;
  updatedBy: string;
}

export type TeamResponse = Team[];
