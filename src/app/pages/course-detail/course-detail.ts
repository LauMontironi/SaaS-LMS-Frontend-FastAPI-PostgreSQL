import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { ICourseDetail } from '../../interfaces/ICourseDetail';
import { CourseDetailService } from '../../services/course-detail.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css'
})
export class CourseDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private courseDetailService = inject(CourseDetailService);
  private sanitizer = inject(DomSanitizer);
  private location = inject(Location);

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
}