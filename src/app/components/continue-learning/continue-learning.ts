import { Component, input, output } from '@angular/core';
import { IDashboardCourse } from '../../interfaces/IDashboard';
import { CourseCard } from '../course-card/course-card';

@Component({
  selector: 'app-continue-learning',
  standalone: true,
  imports: [CourseCard],
  templateUrl: './continue-learning.html',
  styleUrl: './continue-learning.css'
})
export class ContinueLearning {
  courses = input<IDashboardCourse[]>([]);
  exploreCourses = output<void>();

  onExploreCourses(): void {
    this.exploreCourses.emit();
  }
}