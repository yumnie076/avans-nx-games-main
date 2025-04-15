import { Component } from '@angular/core';

import { Router } from '@angular/router';
@Component({
    selector: 'avans-nx-workshop-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router) { }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}
