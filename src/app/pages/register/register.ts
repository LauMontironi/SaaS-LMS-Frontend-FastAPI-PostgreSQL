import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth-service';
import { IUserCreate } from '../../interfaces/IUser';
import { FooterComponent } from '../../components/footer-component/footer-component';
import { Location, NgClass } from '@angular/common';

function passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (!password || !confirmPassword) return null;

  return password === confirmPassword ? null : { passwordsMismatch: true };
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, FooterComponent,NgClass],
  templateUrl: './register.html',
  styleUrl: './register.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Register {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private location = inject(Location);

  showPassword = false;
  showConfirmPassword = false;
  isSubmitting = false;

  registerForm = this.fb.nonNullable.group(
    {
      first_name: ['', [Validators.required, Validators.minLength(4)]],
      last_name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      avatar_url: [''],
      phone: [''],
      address: ['']
    },
    { validators: passwordsMatchValidator }
  );

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  async onSubmit(): Promise<void> {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    try {
      const formValue = this.registerForm.getRawValue();

      const payload: IUserCreate = {
        first_name: formValue.first_name,
        last_name: formValue.last_name,
        email: formValue.email,
        password: formValue.password,
        avatar_url: formValue.avatar_url || null,
        phone: formValue.phone || null,
        address: formValue.address || null,
        is_active: true
      };

      await this.authService.register(payload);

      this.messageService.add({
        severity: 'success',
        summary: 'Registro correcto',
        detail: 'Tu cuenta fue creada correctamente'
      });

      this.router.navigate(['/login']);
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo completar el registro'
      });
    } finally {
      this.isSubmitting = false;
    }
  }

      goBack(): void {
  this.location.back();
}
}