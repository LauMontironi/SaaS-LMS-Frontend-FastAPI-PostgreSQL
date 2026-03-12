import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guards';

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
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/dashboard/dashboard').then(m => m.Dashboard)
  },
  {
    path: 'courses/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/course-detail/course-detail').then(m => m.CourseDetail)
  },

  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./pages/admin-dashboard/admin-dashboard').then(m => m.AdminDashboard)
  },
  {
    path: 'admin/courses',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./pages/admin-courses/admin-courses').then(m => m.AdminCourses)
  },
    {
  path: 'profile',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./pages/profile/profile').then(m => m.Profile)
},

  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found').then(m => m.NotFound)
  },

];