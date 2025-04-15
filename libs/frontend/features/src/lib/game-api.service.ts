import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Game, Review, Favorite } from '@avans-nx-workshop/shared/api';

@Injectable({
  providedIn: 'root'
})
export class GameApiService {
  private readonly baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // Games
  getGames(): Observable<Game[]> {
    return this.http.get<{ results: Game[] }>(`${this.baseUrl}/games`).pipe(
      map(response => response.results)
    );
  }

  getGameById(id: string): Observable<Game> {
    return this.http.get<{ results: Game }>(`${this.baseUrl}/games/${id}`).pipe(
      map(response => response.results)
    );
  }

  createGame(game: Partial<Game>): Observable<Game> {
    return this.http.post<Game>(`${this.baseUrl}/games`, game);
  }

  updateGame(id: string, game: Partial<Game>): Observable<Game> {
    return this.http.put<Game>(`${this.baseUrl}/games/${id}`, game);
  }

  deleteGame(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/games/${id}`);
  }

  // Reviews
  getReviews(): Observable<Review[]> {
    return this.http.get<{ results: Review[] }>(`${this.baseUrl}/reviews`).pipe(
      map(response => response.results)
    );
  }

  createReview(review: Partial<Review>): Observable<Review> {
    return this.http.post<Review>(`${this.baseUrl}/reviews`, review);
  }

  deleteReview(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/reviews/${id}`);
  }

  // Favorites
  getFavorites(): Observable<Favorite[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<{ results: Favorite[] }>(`${this.baseUrl}/favorites/me`, { headers }).pipe(
      map(res => res.results)
    );
  }

  addFavorite(payload: { game: string }): Observable<Favorite> {
    const headers = this.getAuthHeaders();
    return this.http.post<Favorite>(`${this.baseUrl}/favorites`, payload, { headers });
  }

  removeFavorite(game: string): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.baseUrl}/favorites/${game}`, { headers });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }


}
