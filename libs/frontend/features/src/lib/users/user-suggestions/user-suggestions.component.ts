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
      .get<{ results: any[] }>('http://localhost:3000/api/neo4j/suggest-friends/67ff7ca5fd46562d978124b3')
      .subscribe((response) => {
        console.log('Suggesties:', response);
        this.suggestions = response.results;
      });

  }

  befriend(userId: string): void {
    this.http
      .post('http://localhost:3000/api/neo4j/befriend', {
        user1: this.currentUserId,
        user2: userId,
      })
      .subscribe(() => {
        this.suggestions = this.suggestions.filter((u) => u._id !== userId);
      });
  }
}
