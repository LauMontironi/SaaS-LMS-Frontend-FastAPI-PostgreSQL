import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth-service';
import { IUser } from '../../interfaces/IUser';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css'
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser = signal<IUser | null>(null);

  isLoggedIn = computed(() => this.authService.isLoggedIn());

 logout(): void {
  this.authService.logout();
  this.router.navigate(['/landing']);
  }
  
  async ngOnInit(): Promise<void> {
  if (this.isLoggedIn()) {
    try {
      const user = await this.authService.getMe();
      this.currentUser.set(user);
    } catch {
      this.currentUser.set(null);
    }
  }
}
}