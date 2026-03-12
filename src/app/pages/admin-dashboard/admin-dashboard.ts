import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AdminService } from '../../services/admin';
import { IAdminStats } from '../../interfaces/IAdmin';
import { AdminStatsCards } from '../../components/admin/admin-stats-cards/admin-stats-cards';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink, AdminStatsCards],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {
  private adminService = inject(AdminService);
  private location = inject(Location);

  stats = signal<IAdminStats | null>(null);
  isLoading = signal<boolean>(true);

  async ngOnInit(): Promise<void> {
    const data = await this.adminService.getStats();
    this.stats.set(data);
    this.isLoading.set(false);
  }

  goBack(): void {
  this.location.back();
}
}