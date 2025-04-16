import { Route } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { UserDetailsComponent, UserEditComponent, UserListComponent, ColumnsComponent, UserSuggestionsComponent } from '@avans-nx-workshop/features';
import { GameListComponent, GameDetailComponent } from '@avans-nx-workshop/features';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { GameCreateComponent } from '@avans-nx-workshop/features';
import { GameEditComponent } from '@avans-nx-workshop/features';
import { UserFavoritesComponent } from '@avans-nx-workshop/features';

export const appRoutes: Route[] = [
    // Hier komen onze URLs te staan.
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'games', component: GameListComponent },
  { path: 'games/new', component: GameCreateComponent },
  { path: 'games/:id', component: GameDetailComponent },
  { path: 'games/:id/edit', component: GameEditComponent },
  { path: 'favorites', component: UserFavoritesComponent },
  { path: 'suggested-friends', component: UserSuggestionsComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'about', pathMatch: 'full', component: AboutComponent },
    { path: 'users', pathMatch: 'full', component: UserListComponent },
    { path: 'users/:id', component: UserDetailsComponent },
    { path: 'users/new', component: UserEditComponent },
    { path: 'users/:id/edit', component: UserEditComponent },
    {path: 'columns',component: ColumnsComponent, children:[
        {path: ':id', component: UserDetailsComponent}
    ] },




    { path: '**', redirectTo: 'dashboard'}
];
