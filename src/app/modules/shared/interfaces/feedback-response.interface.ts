export interface IFeedbackResponse {
  summary: string;
  stats: {
    finishedPercentage: number;
    inProgressPercentage: number;
    totalProjects: number;
    unfinishedCount: number;
  };
}
