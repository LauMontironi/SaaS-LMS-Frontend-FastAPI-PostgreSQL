import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ICourse } from '../interfaces/ICourses';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private http = inject(HttpClient);


  private base_url = 'https://saas-lms-backend-fastapi-postgresql-production.up.railway.app';

  getAllCourses() {
    return firstValueFrom(this.http.get<ICourse[]>(`${this.base_url}/courses`));
  }

  getCourseByCategory(category: string) {
    return firstValueFrom(
      this.http.get<ICourse[]>(`${this.base_url}/courses?category=${category}`)
    );
  }

    getFeaturedCourses() {
  return firstValueFrom(
    this.http.get<ICourse[]>(`${this.base_url}/courses/featured`)
  );
}

  enrollInCourse(courseId: string) {
  return firstValueFrom(
    this.http.post(`${this.base_url}/courses/${courseId}/enroll`, {})
  );
}
}