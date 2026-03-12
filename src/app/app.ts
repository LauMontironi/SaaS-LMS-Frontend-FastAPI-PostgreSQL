import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';

import { NavbarComponent } from './components/navbar-component/navbar-component';
import { FooterComponent } from './components/footer-component/footer-component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ToastModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Saas_cursos_online_frontend');
}