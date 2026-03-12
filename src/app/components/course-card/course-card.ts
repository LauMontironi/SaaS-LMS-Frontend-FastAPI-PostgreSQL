import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IDashboardCourse } from '../../interfaces/IDashboard';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCard {
  course = input<IDashboardCourse | null>(null);
  showProgress = input<boolean>(false);
}