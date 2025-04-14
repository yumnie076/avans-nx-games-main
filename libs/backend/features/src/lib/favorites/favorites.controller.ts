import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Req,
  Param,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from '@avans-nx-workshop/backend/dto';
import { AuthGuard } from '@avans-nx-workshop/backend/auth'; // pad kan verschillen!

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoriteService: FavoritesService) { }

  // ✅ Favoriet toevoegen — alleen voor ingelogde gebruiker
  @UseGuards(AuthGuard)
  @Post()
  async addFavorite(@Body() dto: CreateFavoriteDto, @Req() req: any) {
    const userId = req.user.user_id;
    return this.favoriteService.create({ ...dto, user: userId });
  }

  // ✅ Eigen favorieten ophalen
  @UseGuards(AuthGuard)
  @Get('me')
  async getMyFavorites(@Req() req: any) {
    const userId = req.user.user_id;
    return this.favoriteService.findAllByUser(userId);
  }

  // ✅ Eigen favoriet verwijderen
  @UseGuards(AuthGuard)
  @Delete(':gameId')
  async removeFavorite(@Param('gameId') gameId: string, @Req() req: any) {
    const userId = req.user.user_id;
    return this.favoriteService.remove(userId, gameId);
  }
}
