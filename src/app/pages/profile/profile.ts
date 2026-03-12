import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth-service';
import { DashboardService } from '../../services/Dashboard.service';
import { IUser } from '../../interfaces/IUser';
import { IDashboardCourse } from '../../interfaces/IDashboard';
import { SkeletonModule } from 'primeng/skeleton';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SkeletonModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  private authService = inject(AuthService);
  private dashboardService = inject(DashboardService);
  private location = inject(Location);

  user = signal<IUser | null>(null);
  enrolledCourses = signal<IDashboardCourse[]>([]);
  isLoading = signal<boolean>(true);

  initials = computed(() => {
    const u = this.user();
    if (!u) return '';
    return (u.first_name.charAt(0) + u.last_name.charAt(0)).toUpperCase();
  });

  async ngOnInit(): Promise<void> {
    try {
      const [currentUser, dashboard] = await Promise.all([
        this.authService.getMe(),
        this.dashboardService.getDashboard()
      ]);

      this.user.set(currentUser);
      this.enrolledCourses.set(dashboard.continue_learning);
    } finally {
      this.isLoading.set(false);
    }
  }

  goBack(): void {
    this.location.back();
  }
}