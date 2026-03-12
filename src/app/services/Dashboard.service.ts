import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IDashboardResponse } from '../interfaces/IDashboard';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);

  private baseUrl =
    'https://saas-lms-backend-fastapi-postgresql-production.up.railway.app';

  getDashboard() {
    return firstValueFrom(
      this.http.get<IDashboardResponse>(`${this.baseUrl}/dashboard/overview`)
    );
  }
}