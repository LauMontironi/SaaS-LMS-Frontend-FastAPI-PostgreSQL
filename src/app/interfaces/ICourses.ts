export interface ICourse {
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
}