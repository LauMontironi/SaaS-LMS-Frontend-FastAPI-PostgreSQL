export interface IAdminStats {
  total_courses: number;
  total_students: number;
  total_enrollments: number;
  total_categories: number;
  featured_courses: number;
  active_courses: number;
}

export interface IAdminCourse {
  id: string;
  instructor_id: string;
  category_id: string;
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
}

export interface IAdminLesson {
  id: string;
  course_id: string;
  title: string;
  content?: string | null;
  video_url?: string | null;
  order: number;
}

export interface IAdminCourseCreate {
  instructor_id: string;
  category_id: string;
  title: string;
  description?: string | null;
  level?: string | null;
  status: string;
  thumbnail_url?: string | null;
  banner_url?: string | null;
  video_url?: string | null;
  preview_url?: string | null;
  is_featured: boolean;
  popularity_score: number;
  is_active: boolean;
}

export interface IAdminLessonCreate {
  title: string;
  content?: string | null;
  video_url?: string | null;
  order: number;
}