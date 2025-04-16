import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-suggestions',
  templateUrl: './user-suggestions.component.html',
})
export class UserSuggestionsComponent implements OnInit {
  suggestions: any[] = [];
  currentUserId = localStorage.getItem('userId');

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    if (!this.currentUserId) return;

    this.http
      .get<{ results: any[] }>(`http://localhost:3000/api/neo4j/suggest-friends/${this.currentUserId}`)
      .subscribe({
        next: (response) => {
          console.log('Suggesties:', response);
          this.suggestions = response.results;
        },
        error: (err) => {
          console.error('Fout bij ophalen suggesties:', err);
        }
      });
  }

  befriend(userId: string): void {
    if (!this.currentUserId) return;

    this.http.post('http://localhost:3000/api/neo4j/befriend', {
      user1: this.currentUserId,
      user2: userId
    }).subscribe({
      next: () => {
        // gebruiker verwijderen uit de suggesties
        this.suggestions = this.suggestions.filter(u => u._id !== userId);
      },
      error: (err) => {
        console.error('Fout bij toevoegen vriend:', err);
      }
    });
  }
}
