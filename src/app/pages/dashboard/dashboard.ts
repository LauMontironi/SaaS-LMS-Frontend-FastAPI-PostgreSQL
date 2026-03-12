import { Component, OnInit, inject, signal } from '@angular/core';

import { DashboardService } from '../../services/Dashboars.service';
import { IUser } from '../../interfaces/IUser';
import { IDashboardCourse } from '../../interfaces/IDashboard';
import { ICourseFilters } from '../../interfaces/IFilters';

import { WelcomeBanner } from '../../components/welcome-banner/welcome-banner';
import { ContinueLearning } from '../../components/continue-learning/continue-learning';
import { CourseSection } from '../../components/course-section/course-section';
import { CategoryTicker } from '../../components/category-ticker/category-ticker';
import { TrustedBrands } from '../../components/trusted-brands/trusted-brands';
import { CourseFilters } from '../../components/course-filters/course-filters';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    WelcomeBanner,
    ContinueLearning,
    CourseSection,
    TrustedBrands,
    CategoryTicker,
    CourseFilters
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  private dashboardService = inject(DashboardService);
  private location = inject(Location);
  

  user = signal<IUser | null>(null);

  continueLearning = signal<IDashboardCourse[]>([]);
  trendingCourses = signal<IDashboardCourse[]>([]);
  recommendedCourses = signal<IDashboardCourse[]>([]);
  allCourses = signal<IDashboardCourse[]>([]);
  filteredCourses = signal<IDashboardCourse[]>([]);

  showFilters = signal<boolean>(false);

  categories = signal<string[]>([
    'Design',
    'Photography & Video',
    'IT & Software',
    'Health & Fitness',
    'Lifestyle',
    'Business',
    'Cooking',
    'Music',
    'Art & Crafts',
    'Marketing',
    'Languages'
  ]);

  async ngOnInit(): Promise<void> {
    const data = await this.dashboardService.getDashboard();

    this.user.set(data.user);
    this.continueLearning.set(data.continue_learning);
    this.trendingCourses.set(data.trending_courses);
    this.recommendedCourses.set(data.what_to_learn_next);
    this.allCourses.set(data.all_courses);
    this.filteredCourses.set(data.all_courses);
  }

  scrollToRecommended(): void {
    const section = document.getElementById('what-to-learn-next');
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  toggleFilters(): void {
    this.showFilters.update(value => !value);
  }

  closeFilters(): void {
    this.showFilters.set(false);
  }

  applyFilters(filters: ICourseFilters): void {
  const normalizedCategory = filters.category.trim().toLowerCase();
  const normalizedLevel = filters.level.trim().toLowerCase();

  if (!normalizedCategory && !normalizedLevel) {
    this.filteredCourses.set(this.allCourses());
    return;
  }

  const filtered = this.allCourses().filter((course) => {
    const matchesCategory =
      !normalizedCategory ||
      (course.category_name ?? '').toLowerCase() === normalizedCategory;

    const matchesLevel =
      !normalizedLevel ||
      (course.level ?? '').toLowerCase() === normalizedLevel;

    return matchesCategory && matchesLevel;
  });

  this.filteredCourses.set(filtered);
  }
  
  goBack(): void {
  this.location.back();
}
}