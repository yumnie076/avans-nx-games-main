import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './user-login.component.html',
})
export class LoginComponent {
  form = {
    emailAddress: '',
    password: ''
  };

  error: string | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit(): void {
    this.http.post<{ token: string }>('http://localhost:3000/api/auth/login', this.form)
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.error = err.error?.message || 'Inloggen mislukt';
        }
      });
  }
}
