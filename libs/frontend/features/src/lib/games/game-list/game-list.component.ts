import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { GameApiService } from '@avans-nx-workshop/features'; 
import { Game } from "@avans-nx-workshop/shared/api";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent {
  games$: Observable<Game[]>;

  constructor(private gameService: GameApiService) {
    this.games$ = this.gameService.getGames();
  }
}
