import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favorite } from './favorite.schema';
import { CreateFavoriteDto } from '@avans-nx-workshop/backend/dto';
import { Neo4JUserService } from '../../../../neo4j/src/lib/neo4j-users.service';
import { Game } from '../games/game.schema';
@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite.name) private favoriteModel: Model<Favorite>,
    @InjectModel(Game.name) private gameModel: Model<Game>,
    private readonly neo4jUserService: Neo4JUserService
  ) { }

  async create(dto: CreateFavoriteDto): Promise<Favorite> {
    const favorite = await this.favoriteModel.create(dto);

    const game = await this.gameModel.findById(dto.game);
    if (game) {
      await this.neo4jUserService.favoriteGame(dto.user, game.title);
    }

    return favorite;
  }

  async findAllByUser(userId: string): Promise<Favorite[]> {
    return this.favoriteModel
      .find({ user: userId })
      .populate('game')
      .exec();
  }

  async remove(userId: string, gameId: string): Promise<void> {
    await this.favoriteModel.deleteOne({ user: userId, game: gameId }).exec();

    const game = await this.gameModel.findById(gameId);
    if (game) {
      await this.neo4jUserService.unfavoriteGame(userId, game.title); // nieuwe methode hieronder
    }
  }
}
