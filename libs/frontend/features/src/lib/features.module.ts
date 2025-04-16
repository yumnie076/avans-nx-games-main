import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// User-related components
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserSuggestionsComponent } from './users/user-suggestions/user-suggestions.component';
import { UserFriendsComponent } from './users/user-friend/user-friends.component';

// Other components
import { ColumnsComponent } from './columns/columns.component';

// Game components
import { GameListComponent } from './games/game-list/game-list.component';
import { GameDetailComponent } from './games/game-detail/game-detail.component';
import { GameCreateComponent } from './games/game-create/game-create.component';
import { GameEditComponent } from './games/game-edit/game-edit.component';
import { UserFavoritesComponent } from './games/user-favorites/user-favorites.component';




@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    // User
    UserDetailsComponent,
    UserListComponent,
    UserEditComponent,
    UserSuggestionsComponent,
    UserFriendsComponent,
   
    // Other
    ColumnsComponent,

    // Game
    GameListComponent,
    GameDetailComponent,
    GameCreateComponent,
    GameEditComponent,
    UserFavoritesComponent
  ],
  exports: [
    // User
    UserDetailsComponent,
    UserListComponent,
    UserEditComponent,
    UserSuggestionsComponent,
    UserFriendsComponent,
  
    // Other
    ColumnsComponent,

    // Game
    GameListComponent,
    GameDetailComponent,
    GameCreateComponent,
    GameEditComponent,
    UserFavoritesComponent
  ]
})
export class FeaturesModule { }
