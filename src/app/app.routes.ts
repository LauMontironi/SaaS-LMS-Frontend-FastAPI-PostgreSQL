import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';

export const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPage },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register').then(m => m.Register)
  },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard').then(m => m.Dashboard)
  },
  {
    path: 'courses/:id',
    loadComponent: () =>
      import('./pages/course-detail/course-detail').then(m => m.CourseDetail)
  },

  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/admin-dashboard/admin-dashboard').then(m => m.AdminDashboard)
  },
  {
    path: 'admin/courses',
    loadComponent: () =>
      import('./pages/admin-courses/admin-courses').then(m => m.AdminCourses)
  }
];