import { PROJECT_STATUS } from '../enums/project-status.enum';
import { IFeedbackResponse } from './feedback-response.interface';

export interface IProject {
  id: number;
  name: string;
  description: string;
  status: PROJECT_STATUS;
  startDate: string;
  finishDate: string;
}

export interface IGetProjectResponse {
  feedback: IFeedbackResponse;
  projects: IProject[];
}

export interface ICreateProject
  extends Pick<IProject, 'name' | 'description'> {}

export interface IUpdateProject
  extends Partial<Omit<IProject, 'id' | 'startDate' | 'finishDate'>> {}
