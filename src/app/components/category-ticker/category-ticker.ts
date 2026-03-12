import { Component, signal } from '@angular/core';

interface Category {
  name: string;
  image: string;
}

@Component({
  selector: 'app-category-ticker',
  standalone: true,
  templateUrl: './category-ticker.html',
  styleUrl: './category-ticker.css'
})
export class CategoryTicker {
  
  categories = signal<Category[]>([
    { name: 'Design', image: '/assets/desing.jpg' },
    { name: 'Business', image: '/assets/bussiness.jpg' },
    { name: 'Cooking', image: '/assets/cooking.jpg' },
    { name: 'Health & Fitness', image: '/assets/health.jpg' },
    { name: 'IT & Software', image: '/assets/IT&Software.jpg' },
    { name: 'Languages', image: '/assets/language.jpg' },
    { name: 'Lifestyle', image: '/assets/lifestyle.jpg' },
    { name: 'Marketing', image: '/assets/marketing.jpg' },
    { name: 'Music', image: '/assets/music.jpg' },
    { name: 'Art & Crafts', image: '/assets/art.jpg' },
    { name: 'Photography & Video', image: '/assets/photo-video.jpg' }
  ]);

}