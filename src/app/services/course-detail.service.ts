import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ICourseDetail } from '../interfaces/ICourseDetail';

@Injectable({
  providedIn: 'root',
})
export class CourseDetailService {
  private http = inject(HttpClient);

  private baseUrl =
    'https://saas-lms-backend-fastapi-postgresql-production.up.railway.app';

  getCourseDetail(courseId: string) {
    return firstValueFrom(
      this.http.get<ICourseDetail>(`${this.baseUrl}/courses/${courseId}/detail`)
    );
  }
}