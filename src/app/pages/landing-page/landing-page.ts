import { Component, inject, OnInit, ChangeDetectorRef  } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { NavbarComponent } from '../../components/navbar-component/navbar-component';
import { CoursesService } from '../../services/CoursesService';
import { ICourse } from '../../interfaces/ICourses';
import { FooterComponent } from "../../components/footer-component/footer-component";


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [ButtonModule, NavbarComponent, CardModule, RouterLink, FooterComponent],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage implements OnInit {
  private coursesService = inject(CoursesService);

  private cdr = inject(ChangeDetectorRef);

  featuredVideos: ICourse[] = [];

async ngOnInit(): Promise<void> {
  try {
    const courses = await this.coursesService.getFeaturedCourses();
    console.log('featured:', courses);

    this.featuredVideos = [...courses];
    this.cdr.detectChanges();
  } catch (error) {
    console.error('Error loading featured courses', error);
  }
}
}