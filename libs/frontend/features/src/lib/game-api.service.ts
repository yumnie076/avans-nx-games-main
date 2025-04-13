import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '@avans-nx-workshop/shared/api';


@Injectable({
  providedIn: 'root'
})
export class GameApiService {
  private readonly baseUrl = 'http://localhost:3000/api/games';

  constructor(private http: HttpClient) { }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.baseUrl);
  }

  getGameById(id: string): Observable<Game> {
    return this.http.get<Game>(`${this.baseUrl}/${id}`);
  }

  createGame(game: Partial<Game>): Observable<Game> {
    return this.http.post<Game>(this.baseUrl, game);
  }

  updateGame(id: string, game: Partial<Game>): Observable<Game> {
    return this.http.put<Game>(`${this.baseUrl}/${id}`, game);
  }

  deleteGame(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

