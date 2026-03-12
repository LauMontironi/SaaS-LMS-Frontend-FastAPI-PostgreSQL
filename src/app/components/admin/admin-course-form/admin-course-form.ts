import {
  Component,
  ChangeDetectionStrategy,
  effect,
  inject,
  input,
  output
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { IAdminCourse, IAdminCourseCreate } from '../../../interfaces/IAdmin';

@Component({
  selector: 'app-admin-course-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-course-form.html',
  styleUrl: './admin-course-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminCourseForm {
  private fb = inject(FormBuilder);

  course = input<IAdminCourse | null>(null);
  instructorId = input.required<string>();

  saveCourse = output<IAdminCourseCreate | Partial<IAdminCourseCreate>>();
  cancelForm = output<void>();

  formTitle = 'Create course';

  courseForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
    category_id: ['', [Validators.required]],
    level: ['', [Validators.required]],
    status: ['published', [Validators.required]],
    thumbnail_url: [''],
    banner_url: [''],
    video_url: [''],
    preview_url: [''],
    is_featured: [false],
    popularity_score: [0, [Validators.required, Validators.min(0)]],
    is_active: [true]
  });

  constructor() {
    effect(() => {
      const currentCourse = this.course();

      if (currentCourse) {
        this.formTitle = 'Edit course';

        this.courseForm.patchValue({
          title: currentCourse.title ?? '',
          description: currentCourse.description ?? '',
          category_id: currentCourse.category_id ?? '',
          level: currentCourse.level ?? '',
          status: currentCourse.status ?? 'published',
          thumbnail_url: currentCourse.thumbnail_url ?? '',
          banner_url: currentCourse.banner_url ?? '',
          video_url: currentCourse.video_url ?? '',
          preview_url: currentCourse.preview_url ?? '',
          is_featured: currentCourse.is_featured ?? false,
          popularity_score: currentCourse.popularity_score ?? 0,
          is_active: currentCourse.is_active ?? true
        });

        return;
      }

      this.formTitle = 'Create course';
      this.courseForm.reset({
        title: '',
        description: '',
        category_id: '',
        level: '',
        status: 'published',
        thumbnail_url: '',
        banner_url: '',
        video_url: '',
        preview_url: '',
        is_featured: false,
        popularity_score: 0,
        is_active: true
      });
    });
  }

  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }

    const payload: IAdminCourseCreate = {
      instructor_id: this.instructorId(),
      category_id: this.courseForm.getRawValue().category_id,
      title: this.courseForm.getRawValue().title,
      description: this.courseForm.getRawValue().description,
      level: this.courseForm.getRawValue().level,
      status: this.courseForm.getRawValue().status,
      thumbnail_url: this.courseForm.getRawValue().thumbnail_url,
      banner_url: this.courseForm.getRawValue().banner_url,
      video_url: this.courseForm.getRawValue().video_url,
      preview_url: this.courseForm.getRawValue().preview_url,
      is_featured: this.courseForm.getRawValue().is_featured,
      popularity_score: this.courseForm.getRawValue().popularity_score,
      is_active: this.courseForm.getRawValue().is_active
    };

    this.saveCourse.emit(payload);
  }

  onCancel(): void {
    this.cancelForm.emit();
  }
}