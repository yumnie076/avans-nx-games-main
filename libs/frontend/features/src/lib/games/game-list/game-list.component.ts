import { Component, OnInit } from '@angular/core';
import { GameApiService } from '@avans-nx-workshop/features';
import { Game, Favorite } from '@avans-nx-workshop/shared/api';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
})
export class GameListComponent implements OnInit {
  games: Game[] = [];
  favorites: string[] = [];

  constructor(private gameService: GameApiService) { }

  ngOnInit(): void {
    this.loadGames();
    this.loadFavorites();
  }

  loadGames(): void {
    this.gameService.getGames().subscribe((games) => (this.games = games));
  }
  favorite: string[] = [];

  loadFavorites(): void {
    this.gameService.getFavorites().subscribe(favs => {
      this.favorites = favs.map(f => f.game._id);
    });
  }

  toggleFavorite(game: string): void {
    if (this.isFavorite(game)) {
      this.gameService.removeFavorite(game).subscribe(() => {
        this.favorites = this.favorites.filter(id => id !== game);
      });
    } else {
      this.gameService.addFavorite({ game }).subscribe(() => {
        this.favorites.push(game);
      });
    }
  }

  isFavorite(gameId: string): boolean {
    return this.favorites.includes(gameId);
  }

 }
  

