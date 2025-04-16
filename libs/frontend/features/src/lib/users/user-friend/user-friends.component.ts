import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-friends',
  templateUrl: './user-friends.component.html',
})
export class UserFriendsComponent implements OnInit {
  friends: any[] = [];
  currentUserId = localStorage.getItem('userId');

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    if (!this.currentUserId) return;

    this.http.get<any>(`http://localhost:3000/api/neo4j/friends-info/${this.currentUserId}`)
      .subscribe((response) => {
        this.friends = response.results;
        console.log('Opgehaalde vrienden:', this.friends);
      });

  }



  unfriend(friendId: string): void {
    this.http.post('http://localhost:3000/api/neo4j/unfriend', {
      user1: this.currentUserId,
      user2: friendId
    }).subscribe(() => {
      
      this.friends = this.friends.filter(f => f._id !== friendId);
    });
  }
}
