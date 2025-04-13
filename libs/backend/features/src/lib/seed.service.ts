import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Neo4jService } from 'nest-neo4j';

import { Game } from './games/game.schema';
import { Favorite } from './favorites/favorite.schema';
import { Review, ReviewModelName } from './reviews/review.schema';
import { User } from '@avans-nx-workshop/backend/user';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectModel('Game') private gameModel: Model<Game>,
    @InjectModel('Favorite') private favoriteModel: Model<Favorite>,
    @InjectModel(ReviewModelName) private reviewModel: Model<Review>,
    @InjectModel('User') private userModel: Model<User>,
    private readonly neo4jService: Neo4jService,
  ) { }

  async seed() {
    this.logger.log('🔁 Start met opschonen van de database...');

    await this.gameModel.deleteMany({});
    await this.favoriteModel.deleteMany({});
    await this.reviewModel.deleteMany({});
    await this.userModel.deleteMany({});

    this.logger.log('✅ Database opgeschoond');

    this.logger.log('👤 Voeg gebruikers toe...');
    const users = await this.userModel.insertMany([
      {
        name: 'Hamid',
        emailAddress: 'hamid@example.com',
        password: 'test123',
        profileImgUrl: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
      },
      {
        name: 'Ali',
        emailAddress: 'ali@example.com',
        password: 'test123',
        profileImgUrl: 'https://cdn-icons-png.flaticon.com/512/219/219983.png',
      },
      {
        name: 'Sara',
        emailAddress: 'sara@example.com',
        password: 'test123',
        profileImgUrl: 'https://cdn-icons-png.flaticon.com/512/219/219970.png',
      },
    ]);

    this.logger.log('🎲 Voeg spellen toe...');
    const games = await this.gameModel.insertMany([
      { title: 'Catan', description: 'Strategisch handelsspel', is18Plus: false },
      { title: 'Risk', description: 'Wereldoverheersing', is18Plus: false },
      { title: 'Uno', description: 'Kaartspel voor iedereen', is18Plus: false },
      { title: 'Exploding Kittens', description: 'Strategie + chaos', is18Plus: false },
    ]);

    this.logger.log('⭐ Voeg favorieten toe...');
    await this.favoriteModel.insertMany([
      { user: users[0]._id, game: games[0]._id },
      { user: users[1]._id, game: games[0]._id },
      { user: users[1]._id, game: games[1]._id },
      { user: users[2]._id, game: games[2]._id },
    ]);

    this.logger.log('📝 Voeg reviews toe...');
    await this.reviewModel.insertMany([
      {
        userId: users[0]._id,
        gameId: games[0]._id,
        rating: 5,
        comment: 'Catan blijft een topper!',
      },
      {
        userId: users[1]._id,
        gameId: games[1]._id,
        rating: 4,
        comment: 'Risk is spannend maar duurt lang',
      },
      {
        userId: users[2]._id,
        gameId: games[2]._id,
        rating: 3,
        comment: 'Uno is leuk voor tussendoor',
      },
    ]);

    this.logger.log('🌐 Voeg gebruikers en favorieten toe in Neo4j...');

    for (const user of users) {
      await this.neo4jService.write(
        `MERGE (u:User {id: $id, name: $name})`,
        { id: user._id.toString(), name: user.name }
      );
    }

    await this.neo4jService.write(`
      MATCH (a:User {name: 'Hamid'}), (b:User {name: 'Ali'})
      MERGE (a)-[:FRIENDS_WITH]->(b)
      MERGE (b)-[:FRIENDS_WITH]->(a)
    `);

    await this.neo4jService.write(`
      MATCH (a:User {name: 'Ali'}), (b:User {name: 'Sara'})
      MERGE (a)-[:FRIENDS_WITH]->(b)
      MERGE (b)-[:FRIENDS_WITH]->(a)
    `);

    for (const game of games) {
      await this.neo4jService.write(
        `MERGE (g:Game {title: $title})`,
        { title: game.title }
      );
    }

    await this.neo4jService.write(`
      MATCH (u:User {name: 'Hamid'}), (g:Game {title: 'Catan'})
      MERGE (u)-[:FAVORITED]->(g)
    `);

    await this.neo4jService.write(`
      MATCH (u:User {name: 'Ali'}), (g:Game {title: 'Catan'})
      MERGE (u)-[:FAVORITED]->(g)
    `);

    await this.neo4jService.write(`
      MATCH (u:User {name: 'Ali'}), (g:Game {title: 'Risk'})
      MERGE (u)-[:FAVORITED]->(g)
    `);

    await this.neo4jService.write(`
      MATCH (u:User {name: 'Sara'}), (g:Game {title: 'Uno'})
      MERGE (u)-[:FAVORITED]->(g)
    `);

    this.logger.log('✅ Demo data succesvol ingevoerd, inclusief Neo4j!');
  }
}
