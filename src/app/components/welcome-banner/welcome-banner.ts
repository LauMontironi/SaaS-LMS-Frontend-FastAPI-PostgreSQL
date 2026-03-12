import { Component, input, computed } from '@angular/core';
import { IUser } from '../../interfaces/IUser';

@Component({
  selector: 'app-welcome-banner',
  standalone: true,
  templateUrl: './welcome-banner.html',
  styleUrl: './welcome-banner.css'
})
export class WelcomeBanner {

  user = input<IUser | null>(null);

  userAvatar = computed(() => {
    const currentUser = this.user();
    return currentUser?.avatar_url ?? null;
  });

  initials = computed(() => {
    const currentUser = this.user();
    if (!currentUser) return '';

    return (
      currentUser.first_name.charAt(0) +
      currentUser.last_name.charAt(0)
    ).toUpperCase();
  });

}