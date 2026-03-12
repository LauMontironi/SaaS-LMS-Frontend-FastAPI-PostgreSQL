export interface ILessonDetail {
  id: string;
  title: string;
  content?: string | null;
  video_url?: string | null;
  order: number;
  completed: boolean;
}

export interface ICourseDetail {
  id: string;
  title: string;
  description?: string | null;
  level?: string | null;
  status: string;
  thumbnail_url?: string | null;
  banner_url?: string | null;
  video_url?: string | null;
  preview_url?: string | null;
  is_active: boolean;
  is_featured: boolean;
  popularity_score: number;
  category_name?: string | null;
  category_slug?: string | null;
  progress: number;
  enrolled: boolean;
  lessons: ILessonDetail[];
}