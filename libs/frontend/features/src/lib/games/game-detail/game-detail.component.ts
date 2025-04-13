import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from '@avans-nx-workshop/shared/api';
import { GameApiService } from '@avans-nx-workshop/features'; 

      

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css'],
  

})
export class GameDetailComponent implements OnInit {
  game?: Game;
 

  constructor(
    private route: ActivatedRoute,
    private gameService: GameApiService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.gameService.getGameById(id).subscribe((game: Game) => (this.game = game));

    }
  }
}
