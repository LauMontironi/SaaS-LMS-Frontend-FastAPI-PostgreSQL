import {
  Component,
  ChangeDetectionStrategy,
  inject,
  input,
  output,
  signal
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { AdminService } from '../../../services/admin';
import { IAdminCourse, IAdminLesson } from '../../../interfaces/IAdmin';

@Component({
  selector: 'app-admin-lessons-manager',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-lessons-manager.html',
  styleUrl: './admin-lessons-manager.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminLessonsManager {
  private fb = inject(FormBuilder);
  private adminService = inject(AdminService);
  private messageService = inject(MessageService);

  course = input<IAdminCourse | null>(null);
  closeManager = output<void>();

  lessons = signal<IAdminLesson[]>([]);
  isLoading = signal<boolean>(false);
  editingLesson = signal<IAdminLesson | null>(null);

  lessonForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    content: [''],
    video_url: [''],
    order: [1, [Validators.required, Validators.min(1)]]
  });

  async loadLessons(): Promise<void> {
    const currentCourse = this.course();
    if (!currentCourse) return;

    this.isLoading.set(true);

    try {
      const data = await this.adminService.getCourseLessons(currentCourse.id);
      this.lessons.set(data);
    } finally {
      this.isLoading.set(false);
    }
  }

  async openManager(): Promise<void> {
    this.resetForm();
    await this.loadLessons();
  }

  editLesson(lesson: IAdminLesson): void {
    this.editingLesson.set(lesson);

    this.lessonForm.patchValue({
      title: lesson.title ?? '',
      content: lesson.content ?? '',
      video_url: lesson.video_url ?? '',
      order: lesson.order ?? 1
    });
  }

  resetForm(): void {
    this.editingLesson.set(null);
    this.lessonForm.reset({
      title: '',
      content: '',
      video_url: '',
      order: 1
    });
  }

  async saveLesson(): Promise<void> {
    const currentCourse = this.course();
    if (!currentCourse) return;

    if (this.lessonForm.invalid) {
      this.lessonForm.markAllAsTouched();
      return;
    }

    try {
      const payload = {
        title: this.lessonForm.getRawValue().title,
        content: this.lessonForm.getRawValue().content,
        video_url: this.lessonForm.getRawValue().video_url,
        order: this.lessonForm.getRawValue().order
      };

      const currentLesson = this.editingLesson();

      if (currentLesson) {
        await this.adminService.updateLesson(currentLesson.id, payload);
        this.messageService.add({
          severity: 'success',
          summary: 'Lesson updated',
          detail: 'The lesson was updated successfully'
        });
      } else {
        await this.adminService.createLesson(currentCourse.id, payload);
        this.messageService.add({
          severity: 'success',
          summary: 'Lesson created',
          detail: 'The lesson was created successfully'
        });
      }

      this.resetForm();
      await this.loadLessons();
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Could not save the lesson'
      });
    }
  }

  async deleteLesson(lessonId: string): Promise<void> {
    const confirmed = window.confirm('Are you sure you want to delete this lesson?');
    if (!confirmed) return;

    try {
      await this.adminService.deleteLesson(lessonId);
      this.messageService.add({
        severity: 'success',
        summary: 'Lesson deleted',
        detail: 'The lesson was deleted successfully'
      });
      await this.loadLessons();
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Could not delete the lesson'
      });
    }
  }

  onClose(): void {
    this.closeManager.emit();
  }
}