import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) { }

  register(): void {
    console.log('Attempting to register with data:', this.registrationData);

    this.authService.register(this.registrationData).subscribe({
      next: (response: any) => {
        console.log('Registration response from server:', response);

        const user: IUserIdentity = response.results;

        if (user?.token && user._id) {
          console.log('User successfully registered with Token:', user.token);

          localStorage.setItem('userId', user._id);

          // neo4j user toevoegen 
          this.http.post('http://localhost:3000/api/neo4j/users', {
            userId: user._id
          }).subscribe({
            next: () => {
              console.log('Gebruiker toegevoegd aan Neo4j');
              this.router.navigate(['/login']);
            },
            error: (err) => {
              console.error('Fout bij aanmaken van Neo4j-gebruiker:', err);
              this.errorMessage = 'Registratie is gelukt, maar Neo4j liep fout. Probeer later opnieuw.';
              this.router.navigate(['/login']);
            }
          });
        } else {
          this.errorMessage = 'Registratie gelukt, maar token of ID ontbreekt. Neem contact op met support.';
        }
      },
      error: (err) => {
        this.errorMessage = 'Registratie mislukt. Probeer opnieuw.';
        console.error('Registratie error:', err);

        if (err.status === 409) {
          this.errorMessage = 'Dit e-mailadres is al in gebruik.';
        } else if (err.status === 400) {
          this.errorMessage = 'Ongeldige gegevens. Controleer je invoer.';
        } else {
          this.errorMessage = 'Er ging iets mis. Probeer later opnieuw.';
        }
      }
    });
  }
}
