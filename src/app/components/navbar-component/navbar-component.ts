import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth-service';

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

  isLoggedIn = computed(() => this.authService.isLoggedIn());

 logout(): void {
  this.authService.logout();
  this.router.navigate(['/landing']);
}
}