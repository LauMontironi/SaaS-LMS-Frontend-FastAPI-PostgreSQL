import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { ICourseDetail } from '../../interfaces/ICourseDetail';
import { CourseDetailService } from '../../services/course-detail.service';
import { Location } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { LessonProgressService } from '../../services/lesson-progress.service';
import { CoursesService } from '../../services/CoursesService';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [SkeletonModule],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css'
})
export class CourseDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private courseDetailService = inject(CourseDetailService);
  private sanitizer = inject(DomSanitizer);
  private location = inject(Location);

  private coursesService = inject(CoursesService);
  private lessonProgressService = inject(LessonProgressService);
   private messageService = inject(MessageService);

isEnrolling = signal<boolean>(false);
isTogglingLesson = signal<string | null>(null);

  course = signal<ICourseDetail | null>(null);
  isLoading = signal<boolean>(true);

  previewEmbedUrl = computed<SafeResourceUrl | null>(() => {
    const currentCourse = this.course();

    if (!currentCourse) return null;

    const rawUrl = currentCourse.preview_url || currentCourse.video_url;

    if (!rawUrl) return null;

    const embedUrl = this.toYoutubeEmbedUrl(rawUrl);

    if (!embedUrl) return null;

    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  });

  async ngOnInit(): Promise<void> {
    const courseId = this.route.snapshot.paramMap.get('id');

    if (!courseId) {
      this.isLoading.set(false);
      return;
    }

    const data = await this.courseDetailService.getCourseDetail(courseId);
    this.course.set(data);
    this.isLoading.set(false);
  }

  private toYoutubeEmbedUrl(url: string): string | null {
    try {
      const parsedUrl = new URL(url);

      if (
        parsedUrl.hostname.includes('youtube.com') &&
        parsedUrl.searchParams.get('v')
      ) {
        const videoId = parsedUrl.searchParams.get('v');
        return `https://www.youtube.com/embed/${videoId}`;
      }

      if (parsedUrl.hostname.includes('youtu.be')) {
        const videoId = parsedUrl.pathname.replace('/', '');
        return `https://www.youtube.com/embed/${videoId}`;
      }

      return null;
    } catch {
      return null;
    }
  }

      goBack(): void {
  this.location.back();
  }
  
  async enroll(): Promise<void> {
  const currentCourse = this.course();
  if (!currentCourse) return;

  this.isEnrolling.set(true);

  try {
    await this.coursesService.enrollInCourse(currentCourse.id.toString());

    this.messageService.add({
      severity: 'success',
      summary: 'Enrolled!',
      detail: 'You have been enrolled in this course'
    });

    // recargar el detalle para reflejar enrolled: true
    const updated = await this.courseDetailService.getCourseDetail(currentCourse.id.toString());
    this.course.set(updated);

  } catch (error) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Could not enroll in this course'
    });
  } finally {
    this.isEnrolling.set(false);
  }
}

async toggleLesson(lesson: { id: string; completed: boolean }): Promise<void> {
  this.isTogglingLesson.set(lesson.id);

  try {
    if (lesson.completed) {
      await this.lessonProgressService.uncompleteLesson(lesson.id);
    } else {
      await this.lessonProgressService.completeLesson(lesson.id);
    }

    // recargar curso para actualizar progreso
    const currentCourse = this.course();
    if (currentCourse) {
      const updated = await this.courseDetailService.getCourseDetail(currentCourse.id.toString());
      this.course.set(updated);
    }

  } catch (error) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Could not update lesson progress'
    });
  } finally {
    this.isTogglingLesson.set(null);
  }
}
}