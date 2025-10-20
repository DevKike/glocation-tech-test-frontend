import { PROJECT_STATUS } from '../enums/project-status.enum';

export interface IProject {
  id: number;
  name: string;
  description: string;
  status: PROJECT_STATUS;
  startDate: string;
  finishDate: string;
}

export interface ICreateProject
  extends Pick<IProject, 'name' | 'description'> {}

export interface IUpdateProject
  extends Partial<Omit<IProject, 'id' | 'startDate' | 'finishDate'>> {}
