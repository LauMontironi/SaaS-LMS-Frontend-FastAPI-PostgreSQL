import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import {
  IAdminCourse,
  IAdminCourseCreate,
  IAdminLesson,
  IAdminLessonCreate,
  IAdminStats
} from '../interfaces/IAdmin';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private http = inject(HttpClient);

  private baseUrl =
    'https://saas-lms-backend-fastapi-postgresql-production.up.railway.app';

  getStats() {
    return firstValueFrom(
      this.http.get<IAdminStats>(`${this.baseUrl}/admin/stats`)
    );
  }

  getCourses() {
    return firstValueFrom(
      this.http.get<IAdminCourse[]>(`${this.baseUrl}/admin/courses`)
    );
  }

  createCourse(payload: IAdminCourseCreate) {
    return firstValueFrom(
      this.http.post<IAdminCourse>(`${this.baseUrl}/admin/courses`, payload)
    );
  }

  updateCourse(courseId: string, payload: Partial<IAdminCourseCreate>) {
    return firstValueFrom(
      this.http.put<IAdminCourse>(`${this.baseUrl}/admin/courses/${courseId}`, payload)
    );
  }

  deleteCourse(courseId: string) {
    return firstValueFrom(
      this.http.delete(`${this.baseUrl}/admin/courses/${courseId}`)
    );
  }

  getCourseLessons(courseId: string) {
    return firstValueFrom(
      this.http.get<IAdminLesson[]>(`${this.baseUrl}/admin/courses/${courseId}/lessons`)
    );
  }

  createLesson(courseId: string, payload: IAdminLessonCreate) {
    return firstValueFrom(
      this.http.post<IAdminLesson>(`${this.baseUrl}/admin/courses/${courseId}/lessons`, payload)
    );
  }

  updateLesson(lessonId: string, payload: Partial<IAdminLessonCreate>) {
    return firstValueFrom(
      this.http.put<IAdminLesson>(`${this.baseUrl}/admin/lessons/${lessonId}`, payload)
    );
  }

  deleteLesson(lessonId: string) {
    return firstValueFrom(
      this.http.delete(`${this.baseUrl}/admin/lessons/${lessonId}`)
    );
  }
}