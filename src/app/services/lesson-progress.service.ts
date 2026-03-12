import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonProgressService {
  private http = inject(HttpClient);
  private baseUrl = 'https://saas-lms-backend-fastapi-postgresql-production.up.railway.app';

  completeLesson(lessonId: string) {
    return firstValueFrom(
      this.http.post(`${this.baseUrl}/lessons/${lessonId}/complete`, {})
    );
  }

  uncompleteLesson(lessonId: string) {
    return firstValueFrom(
      this.http.delete(`${this.baseUrl}/lessons/${lessonId}/complete`)
    );
  }
}