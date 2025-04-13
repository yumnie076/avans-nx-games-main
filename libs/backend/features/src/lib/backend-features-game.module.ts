import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GamesController } from './games/games.controller';
import { GamesService } from './games/games.service';
import { Game, GameSchema } from './games/game.schema';

import { ReviewsController } from './reviews/reviews.controller';
import { ReviewsService } from './reviews/reviews.service';
import { Review, ReviewSchema } from './reviews/review.schema';

import { ReviewModelName } from './reviews/review.schema';

import { FavoritesController } from './favorites/favorites.controller';
import { FavoritesService } from './favorites/favorites.service';
import { FavoriteModelName, FavoriteSchema } from './favorites/favorite.schema';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UsersModule } from '@avans-nx-workshop/backend/user'; // of het juiste pad

import { Neo4jBackendModule } from '@avans-nx-workshop/backend/neo4j';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Game.name, schema: GameSchema },
      { name: Review.name, schema: ReviewSchema },
      { name: FavoriteModelName, schema: FavoriteSchema }, 
    ]),
    UsersModule,
    Neo4jBackendModule,
  ],
  providers: [GamesService, ReviewsService, FavoritesService, SeedService],
  controllers: [GamesController, ReviewsController, FavoritesController, SeedController],        
  exports: [GamesService, ReviewsService, FavoritesService],              
})
export class BackendFeaturesGameModule { }
