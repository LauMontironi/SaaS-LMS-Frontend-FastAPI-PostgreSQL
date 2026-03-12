import { Component, OnInit, inject, signal } from '@angular/core';
import { MessageService } from 'primeng/api';

import { AdminService } from '../../services/admin';
import { IAdminCourse, IAdminCourseCreate } from '../../interfaces/IAdmin';
import { AdminCourseForm } from '../../components/admin/admin-course-form/admin-course-form';
import { AdminLessonsManager } from '../../components/admin/admin-lessons-manager/admin-lessons-manager';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-courses',
  standalone: true,
  imports: [AdminCourseForm, AdminLessonsManager],
  templateUrl: './admin-courses.html',
  styleUrl: './admin-courses.css'
})
export class AdminCourses implements OnInit {
  private adminService = inject(AdminService);
  private messageService = inject(MessageService);
  private location = inject(Location);

  courses = signal<IAdminCourse[]>([]);
  isLoading = signal<boolean>(true);

  showForm = signal<boolean>(false);
  editingCourse = signal<IAdminCourse | null>(null);

  showLessonsManager = signal<boolean>(false);
  selectedCourseForLessons = signal<IAdminCourse | null>(null);

  instructorId = '9cfff6f5-0c6c-4b18-8cdf-6805c3aebb2d';

  async ngOnInit(): Promise<void> {
    await this.loadCourses();
  }

  async loadCourses(): Promise<void> {
    const data = await this.adminService.getCourses();
    this.courses.set(data);
    this.isLoading.set(false);
  }

  openCreateForm(): void {
    this.editingCourse.set(null);
    this.showForm.set(true);
    this.showLessonsManager.set(false);
  }

  openEditForm(course: IAdminCourse): void {
    this.editingCourse.set(course);
    this.showForm.set(true);
    this.showLessonsManager.set(false);
  }

  openLessonsManager(course: IAdminCourse): void {
    this.selectedCourseForLessons.set(course);
    this.showLessonsManager.set(true);
    this.showForm.set(false);
  }

  closeForm(): void {
    this.showForm.set(false);
    this.editingCourse.set(null);
  }

  closeLessonsManager(): void {
    this.showLessonsManager.set(false);
    this.selectedCourseForLessons.set(null);
  }

  async saveCourse(payload: IAdminCourseCreate | Partial<IAdminCourseCreate>): Promise<void> {
    try {
      const currentCourse = this.editingCourse();

      if (currentCourse) {
        await this.adminService.updateCourse(currentCourse.id, payload);
        this.messageService.add({
          severity: 'success',
          summary: 'Course updated',
          detail: 'The course was updated successfully'
        });
      } else {
        await this.adminService.createCourse(payload as IAdminCourseCreate);
        this.messageService.add({
          severity: 'success',
          summary: 'Course created',
          detail: 'The course was created successfully'
        });
      }

      this.closeForm();
      await this.loadCourses();
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Could not save the course'
      });
    }
  }

  async deleteCourse(courseId: string): Promise<void> {
    const confirmed = window.confirm('Are you sure you want to delete this course?');
    if (!confirmed) return;

    try {
      await this.adminService.deleteCourse(courseId);
      this.messageService.add({
        severity: 'success',
        summary: 'Course deleted',
        detail: 'The course was deleted successfully'
      });
      await this.loadCourses();
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Could not delete the course'
      });
    }
  }

    goBack(): void {
  this.location.back();
}
}