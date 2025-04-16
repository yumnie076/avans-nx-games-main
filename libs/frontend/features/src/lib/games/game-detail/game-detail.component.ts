import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameApiService } from '@avans-nx-workshop/features';
import { Game, Review } from '@avans-nx-workshop/shared/api';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
})
export class GameDetailComponent implements OnInit {
  game!: Game;
  reviews: Review[] = [];
  newReview: Partial<Review> = { rating: 5 };
  currentUserId: string = '';

  constructor(
    private route: ActivatedRoute,
    private gameService: GameApiService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.gameService.getGameById(id).subscribe((game) => (this.game = game));

    this.gameService.getReviews().subscribe((reviews: Review[]) => {
      this.reviews = reviews.filter((r: Review) => {
        const gameId = r.gameId as string | { _id: string };
        if (typeof gameId === 'object' && gameId !== null) {
          return gameId._id === id;
        }
        return gameId === id;
      });

      console.log(' Reviews voor dit spel:', this.reviews);
    });


    this.currentUserId = localStorage.getItem('userId') || '';
  }


  submitReview(): void {
    if (!this.newReview.rating) return;
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.gameService.createReview({
      ...this.newReview,
      userId,
      gameId: this.game._id, 
    }).subscribe(() => {
      this.ngOnInit(); 
      this.newReview = { rating: 5 }; 
    });

  }

  deleteReview(reviewId: string): void {
    this.gameService.deleteReview(reviewId).subscribe(() => {
      this.reviews = this.reviews.filter((r) => r._id !== reviewId);
    });
  }

  getReviewerName(review: Review): string {
    if (typeof review.userId === 'object' && review.userId !== null) {
      return review.userId.name || review.userId.emailAddress || 'Onbekend';
    }
    return 'Onbekend';
  }

  getReviewerId(review: Review): string {
    if (typeof review.userId === 'object' && review.userId !== null) {
      return review.userId._id;
    }
    return review.userId;
  }

}
