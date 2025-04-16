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
import { AuthGuard } from '@avans-nx-workshop/backend/auth'; 

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoriteService: FavoritesService) { }


  @UseGuards(AuthGuard)
  @Post()
  async addFavorite(@Body() dto: CreateFavoriteDto, @Req() req: any) {
    const userId = req.user.user_id;
    return this.favoriteService.create({ ...dto, user: userId });
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async getMyFavorites(@Req() req: any) {
    const userId = req.user.user_id;
    return this.favoriteService.findAllByUser(userId);
  }

  
  @UseGuards(AuthGuard)
  @Delete(':gameId')
  async removeFavorite(@Param('gameId') gameId: string, @Req() req: any) {
    const userId = req.user.user_id;
    return this.favoriteService.remove(userId, gameId);
  }
}
