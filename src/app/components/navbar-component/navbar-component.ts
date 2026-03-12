import { Component, HostListener, OnInit, computed, inject, signal } from '@angular/core';
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
export class NavbarComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser = signal<IUser | null>(null);
  dropdownOpen = signal<boolean>(false);

  isLoggedIn = computed(() => this.authService.isLoggedIn());

  initials = computed(() => {
    const user = this.currentUser();
    if (!user) return '';
    return `${user.first_name?.charAt(0) ?? ''}${user.last_name?.charAt(0) ?? ''}`.toUpperCase();
  });

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

  toggleDropdown(): void {
    this.dropdownOpen.update(v => !v);
  }

  closeDropdown(): void {
    this.dropdownOpen.set(false);
  }

  // cierra el dropdown al hacer click fuera
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-menu')) {
      this.dropdownOpen.set(false);
    }
  }

  logout(): void {
    this.authService.logout();
    this.currentUser.set(null);
    this.dropdownOpen.set(false);
    this.router.navigate(['/landing']);
  }
}