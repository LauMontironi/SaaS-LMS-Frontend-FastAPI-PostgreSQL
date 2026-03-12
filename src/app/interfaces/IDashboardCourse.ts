export interface IDashboardCourse {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string | null;
  banner_url: string | null;
  level: string;
  popularity_score: number;
  is_featured: boolean;
  progress?: number;
  completed_lessons?: number;
  total_lessons?: number;
}