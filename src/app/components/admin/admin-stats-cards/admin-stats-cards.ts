import { Component, input } from '@angular/core';
import { IAdminStats } from '../../../interfaces/IAdmin';

@Component({
  selector: 'app-admin-stats-cards',
  standalone: true,
  templateUrl: './admin-stats-cards.html',
  styleUrl: './admin-stats-cards.css'
})
export class AdminStatsCards {
  stats = input<IAdminStats | null>(null);
}