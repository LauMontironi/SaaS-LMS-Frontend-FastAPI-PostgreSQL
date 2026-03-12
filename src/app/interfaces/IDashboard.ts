import { ICourse } from './ICourses';
import { IUser } from './IUser';

export interface IDashboardCourse extends ICourse {
  progress: number;
  category_name?: string | null;
  category_slug?: string | null;
}

export interface IDashboardResponse {
  user: IUser;
  continue_learning: IDashboardCourse[];
  what_to_learn_next: IDashboardCourse[];
  trending_courses: IDashboardCourse[];
  all_courses: IDashboardCourse[];
}