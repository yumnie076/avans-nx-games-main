import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favorite } from './favorite.schema';
import { CreateFavoriteDto } from '@avans-nx-workshop/backend/dto';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite.name) private favoriteModel: Model<Favorite>
  ) { }

  async create(dto: CreateFavoriteDto): Promise<Favorite> {
    return this.favoriteModel.create(dto);
  }

  async findAllByUser(userId: string): Promise<Favorite[]> {
    return this.favoriteModel
      .find({ user: userId })
      .populate('game')
      .exec();
  }

  async remove(userId: string, gameId: string): Promise<void> {
    await this.favoriteModel.deleteOne({ user: userId, game: gameId }).exec();
  }
}
