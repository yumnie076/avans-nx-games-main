import { Injectable, Logger } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@avans-nx-workshop/backend/user';

@Injectable()
export class Neo4JUserService {
  private readonly logger: Logger = new Logger(Neo4JUserService.name);

  constructor(
    private readonly neo4jService: Neo4jService,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) { }

  async createUser(userId: string): Promise<void> {
    await this.neo4jService.write(`
      MERGE (u:User {id: $userId})
    `, { userId });
  }

  async favoriteGame(userId: string, gameTitle: string): Promise<void> {
    await this.neo4jService.write(`
      MERGE (u:User {id: $userId})
      MERGE (g:Game {title: $gameTitle})
      MERGE (u)-[:FAVORITED]->(g)
    `, { userId, gameTitle });
  }

  async befriendUsers(user1: string, user2: string): Promise<void> {
    await this.neo4jService.write(`
    MATCH (u1:User {id: $user1}), (u2:User {id: $user2})
    MERGE (u1)-[:FRIENDS_WITH]->(u2)
    MERGE (u2)-[:FRIENDS_WITH]->(u1)
  `, { user1, user2 });
  }


  async findUsersWithSharedFavorites(userId: string): Promise<any[]> {
    const query = `
      MATCH (u1:User {id: $userId})-[:FAVORITED]->(g:Game)<-[:FAVORITED]-(u2:User),
            (u1)-[:FRIENDS_WITH]->(u2)
      WHERE u1 <> u2
      RETURN DISTINCT u2.id AS userId, collect(g.title) AS sharedGames
    `;

    const result = await this.neo4jService.read(query, { userId });

    const enriched = await Promise.all(result.records.map(async (record) => {
      const mongoUser = await this.userModel.findById(record.get('userId'));
      return {
        userId: record.get('userId'),
        sharedGames: record.get('sharedGames'),
        name: mongoUser?.name || 'Onbekend',
        email: mongoUser?.emailAddress || '',
      };
    }));

    return enriched;
  }

  async findAll(): Promise<any[]> {
    this.logger.log('findAll users');
    const results = await this.neo4jService.read(`MATCH (u:User) RETURN u`);
    return results.records.map((record) => record.get('u').properties);
  }

  async getFriendsWithMongoInfo(userId: string): Promise<any[]> {
    const query = `
    MATCH (u1:User {id: $userId})-[:FRIENDS_WITH]->(u2:User)
    RETURN DISTINCT u2.id AS friendId
  `;
    const result = await this.neo4jService.read(query, { userId });

    const friendIds = result.records.map((r) => r.get('friendId'));
    const mongoUsers = await this.userModel
      .find({ _id: { $in: friendIds } })
      .select('name emailAddress profileImgUrl')
      .exec();

    return mongoUsers;
  }

}
