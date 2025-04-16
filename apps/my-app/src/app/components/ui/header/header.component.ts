import { Component } from '@angular/core';
import { AuthService } from '../../../../../../../libs/frontend/features/src/lib/auth/auth.service';
import { Router } from '@angular/router';
@Component({
    selector: 'avans-nx-workshop-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public authService: AuthService, private router: Router) { }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}
