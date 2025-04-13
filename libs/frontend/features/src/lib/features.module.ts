import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { GameListComponent } from './games/game-list/game-list.component';
import { GameDetailComponent } from './games/game-detail/game-detail.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { ColumnsComponent } from './columns/columns.component';

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  declarations: [
 
    UserDetailsComponent,
    UserListComponent,
    UserEditComponent,
    ColumnsComponent,
  ],
  exports: [
   
    UserDetailsComponent,
    UserListComponent,
    UserEditComponent,
    ColumnsComponent,
  ]

})
export class FeaturesModule { }
