import { Component, OnInit } from '@angular/core';
import { Game } from '@avans-nx-workshop/shared/api';
import { GameApiService } from '@avans-nx-workshop/features';

@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
})
export class UserFavoritesComponent implements OnInit {
  favoriteGames: Game[] = [];

  constructor(private gameService: GameApiService) { }

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.gameService.getFavorites().subscribe(favorites => {
      this.favoriteGames = favorites.map(fav => fav.game as Game); // fav.game casten
    });
  }
}
