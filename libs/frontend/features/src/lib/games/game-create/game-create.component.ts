import { Component } from '@angular/core';
import { GameApiService } from '@avans-nx-workshop/features';
import { Router } from '@angular/router';
import { Game } from '@avans-nx-workshop/shared/api';

@Component({
  selector: 'avans-nx-workshop-game-create',
  templateUrl: './game-create.component.html',
})
export class GameCreateComponent {
  game: Partial<Game> = {
    title: '',
    releaseDate: '',
    isMultiplayer: false,
    description: '',
    minPlayers: undefined,
    maxPlayers: undefined,
    genre: '',
    languageIndependent: false
  };

  constructor(
    private gameApi: GameApiService,
    private router: Router
  ) { }

  createGame() {
    this.gameApi.createGame(this.game).subscribe({
      next: (newGame) => {
        console.log('Game created:', newGame);
        this.router.navigate(['/games']);
      },
      error: (err) => {
        console.error('Failed to create game:', err);
      }
    });
  }
}
