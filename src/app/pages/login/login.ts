
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth-service';
import { MessageService } from 'primeng/api';
import { NgClass, Location } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass ],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private location = inject(Location);

  showPassword = false;

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  async onSubmit(): Promise<void> {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    try {

      // 1️⃣ login
      const response = await this.authService.login(this.loginForm.getRawValue());

      // 2️⃣ guardar token
      this.authService.setSession(response.token);

      // 3️⃣ obtener usuario actual
      const currentUser = await this.authService.getMe();

      this.messageService.add({
        severity: 'success',
        summary: 'Login correcto',
        detail: `Bienvenido ${currentUser.first_name}`
      });

      // 4️⃣ redirección según role
      if (currentUser.role === 'admin') {
        this.router.navigate(['/admin']);
        return;
      }

      // default student
      this.router.navigate(['/dashboard']);

    } catch (error) {

      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Credenciales incorrectas'
      });

    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

    goBack(): void {
  this.location.back();
}

}