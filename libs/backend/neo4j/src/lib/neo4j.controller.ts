import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Neo4JUserService } from './neo4j-users.service';

@Controller('neo4j')
export class Neo4jController {
  constructor(private readonly neo4jService: Neo4JUserService) { }

  // 🔧 Maak een user aan in Neo4j
  @Post('users')
  async createUser(@Body() body: { userId: string }) {
    await this.neo4jService.createUser(body.userId);
    return { message: 'User created in Neo4j' };
  }

  // ⭐ Voeg een game toe aan de favorieten van een user
  @Post('favorite')
  async favoriteGame(@Body() body: { userId: string; gameTitle: string }) {
    await this.neo4jService.favoriteGame(body.userId, body.gameTitle);
    return { message: 'Game favorited' };
  }

  // 👥 Maak twee users vrienden
  @Post('befriend')
  async befriendUsers(@Body() body: { userId1: string; userId2: string }) {
    await this.neo4jService.befriendUsers(body.userId1, body.userId2);
    return { message: 'Users are now friends' };
  }

  // 🔍 Vind users met gedeelde favoriete games
  @Get('shared-favorites/:userId')
  async sharedFavorites(@Param('userId') userId: string) {
    return this.neo4jService.findUsersWithSharedFavorites(userId);
  }

  // 🔍 Vind vrienden en haal extra MongoDB info op
  @Get('friends-info/:userId')
  async getFriendsWithMongo(@Param('userId') userId: string) {
    return this.neo4jService.getFriendsWithMongoInfo(userId);
  }

  // 🐛 Debug: alle users in Neo4j
  @Get('users')
  async getAllUsers() {
    return this.neo4jService.findAll();
  }
}
