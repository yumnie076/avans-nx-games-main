import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameApiService } from '@avans-nx-workshop/features';
import { Game } from '@avans-nx-workshop/shared/api';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html'
})
export class GameEditComponent implements OnInit {
  gameId!: string;
  game: Partial<Game> = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameApiService
  ) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id')!;
    this.gameService.getGameById(this.gameId).subscribe(game => {
      this.game = game;
    });
  }

  updateGame(): void {
    this.gameService.updateGame(this.gameId, this.game).subscribe(() => {
      this.router.navigate(['/games', this.gameId]);
    });
  }

  deleteGame(): void {
    if (confirm('Weet je zeker dat je dit spel wilt verwijderen?')) {
      this.gameService.deleteGame(this.gameId).subscribe(() => {
        this.router.navigate(['/games']);
      });
    }
  }
}
