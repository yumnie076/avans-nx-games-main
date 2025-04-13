import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from '@avans-nx-workshop/backend/dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoriteService: FavoritesService) { }

  @Post()
  async addFavorite(@Body() dto: CreateFavoriteDto) {
    return this.favoriteService.create(dto);
  }

  @Get(':userId')
  async getFavoritesByUser(@Param('userId') userId: string) {
    return this.favoriteService.findAllByUser(userId);
  }

  @Delete(':userId/:gameId')
  async removeFavorite(
    @Param('userId') userId: string,
    @Param('gameId') gameId: string
  ) {
    return this.favoriteService.remove(userId, gameId);
  }
}
