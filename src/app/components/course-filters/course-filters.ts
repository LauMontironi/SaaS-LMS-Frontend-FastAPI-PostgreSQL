import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ICourseFilters } from '../../interfaces/IFilters';

@Component({
  selector: 'app-course-filters',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './course-filters.html',
  styleUrl: './course-filters.css'
})
export class CourseFilters {
  isOpen = input<boolean>(false);
  categories = input<string[]>([]);

  levels = signal<string[]>(['beginner', 'intermediate', 'advanced']);

  filtersChange = output<ICourseFilters>();
  closePanel = output<void>();

  selectedCategory = '';
  selectedLevel = '';

  applyFilters(): void {
    this.filtersChange.emit({
      category: this.selectedCategory,
      level: this.selectedLevel
    });
  }

  clearFilters(): void {
    this.selectedCategory = '';
    this.selectedLevel = '';

    this.filtersChange.emit({
      category: '',
      level: ''
    });
  }

  close(): void {
    this.closePanel.emit();
  }
}