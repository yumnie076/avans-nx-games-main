import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../../libs/frontend/features/src/lib/auth/auth.service';
import { IUserRegistration, IUserIdentity } from '@avans-nx-workshop/shared/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registrationData: IUserRegistration = {
    name: '',
    emailAddress: '',
    password: ''
  };

  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  register(): void {
    console.log('Attempting to register with data:', this.registrationData);

    this.authService.register(this.registrationData).subscribe({
      next: (response: any) => {
        console.log('Registration response from server:', response);

     
        const user: IUserIdentity = response.results;

       
        if (user?.token) {
          console.log('User successfully registered with Token:', user.token);

        
          this.router.navigate(['/login']);
        } else {
          console.warn(
            'Registration successful but missing token in the response:',
            response
          );
          this.errorMessage =
            'Registration successful, but token is missing. Please contact support.';
        }
      },
      error: (err) => {
        this.errorMessage = 'Registration failed. Please try again.';
        console.error('Registration error occurred:', err);

        
        if (err.error) {
          console.error('Backend error message:', err.error.message || err.error);
        }

        if (err.status === 409) {
          this.errorMessage = 'Email is already in use. Please use a different email.';
        } else if (err.status === 400) {
          this.errorMessage = 'Invalid registration data. Please check your input.';
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }
}
