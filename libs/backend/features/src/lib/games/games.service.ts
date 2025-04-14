import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game } from './game.schema';
import { CreateGameDto, UpdateGameDto } from '@avans-nx-workshop/backend/dto';

@Injectable()
export class GamesService {
  constructor(@InjectModel(Game.name) private gameModel: Model<Game>) { }

  async create(dto: CreateGameDto): Promise<Game> {
    return this.gameModel.create(dto);
  }

  async findAll(): Promise<Game[]> {
    return this.gameModel.find().exec();
  }

  async findOne(id: string): Promise<Game | null> {
    return this.gameModel.findById(id).exec();
  }

  async update(id: string, dto: UpdateGameDto): Promise<Game | null> {
    return this.gameModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async delete(id: string): Promise<Game | null> {
    return this.gameModel.findByIdAndDelete(id).exec();
  }
}
