import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Neo4JUserService } from './neo4j-users.service';

@Controller('neo4j')
export class Neo4jController {
  constructor(private readonly neo4jService: Neo4JUserService) { }

  
  @Post('users')
  async createUser(@Body() body: { userId: string }) {
    await this.neo4jService.createUser(body.userId);
    return { message: 'User created in Neo4j' };
  }

  
  @Post('favorite')
  async favoriteGame(@Body() body: { userId: string; gameTitle: string }) {
    await this.neo4jService.favoriteGame(body.userId, body.gameTitle);
    return { message: 'Game favorited' };
  }

  
  @Post('befriend')
  async befriendUsers(@Body() body: { user1: string; user2: string }) {
    console.log('VRIENDENSCHAP:', body);
    await this.neo4jService.befriendUsers(body.user1, body.user2);
    return { message: 'Users are now friends' };
  }


  @Post('unfriend')
  async unfriend(@Body() body: { user1: string; user2: string }) {
    await this.neo4jService.unfriendUsers(body.user1, body.user2);
    return { message: 'Gebruikers zijn geen vrienden meer' };
  }



  @Get('shared-favorites/:userId')
  async sharedFavorites(@Param('userId') userId: string) {
    return this.neo4jService.findUsersWithSharedFavorites(userId);
  }


  @Get('friends-info/:userId')
  async getFriendsWithMongo(@Param('userId') userId: string) {
    return this.neo4jService.getFriendsWithMongoInfo(userId);
  }
  @Get('suggest-friends/:userId')
  async suggestFriends(@Param('userId') userId: string) {
    return this.neo4jService.findUsersToBefriend(userId);
  }

 
  @Get('users')
  async getAllUsers() {
    return this.neo4jService.findAll();
  }
}
