import { Component, input } from '@angular/core';
import { IDashboardCourse } from '../../interfaces/IDashboard';
import { CourseCard } from '../course-card/course-card';

@Component({
  selector: 'app-course-section',
  standalone: true,
  imports: [CourseCard],
  templateUrl: './course-section.html',
  styleUrl: './course-section.css'
})
export class CourseSection {
  title = input<string>('');
  subtitle = input<string>('');
  courses = input<IDashboardCourse[]>([]);
}