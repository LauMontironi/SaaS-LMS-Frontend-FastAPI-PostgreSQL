import { Component, inject, OnInit, ChangeDetectorRef, signal  } from '@angular/core';
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

   featuredCourses = signal<ICourse[]>([]);

  categories = [
    { name: 'IT & Software', icon: '💻', bg: '#eff6ff' },
    { name: 'Design', icon: '🎨', bg: '#fdf4ff' },
    { name: 'Marketing', icon: '📣', bg: '#fff7ed' },
    { name: 'Business', icon: '💼', bg: '#f0fdf4' },
    { name: 'Languages', icon: '🌍', bg: '#fefce8' },
    { name: 'Photography', icon: '📸', bg: '#fff1f2' },
    { name: 'Health', icon: '🏃', bg: '#f0fdfa' },
    { name: 'Music', icon: '🎵', bg: '#faf5ff' },
    { name: 'Cooking', icon: '🍳', bg: '#fff7ed' },
    { name: 'Art & Crafts', icon: '🎭', bg: '#fdf4ff' },
    { name: 'Lifestyle', icon: '✨', bg: '#fefce8' },
  ];

async ngOnInit(): Promise<void> {
  try {
    const courses = await this.coursesService.getFeaturedCourses();
    console.log('featured:', courses);

    // this.featuredVideos = [...courses];
    this.featuredCourses.set(courses)
    this.cdr.detectChanges();
  } catch (error) {
    console.error('Error loading featured courses', error);
  }
}
}