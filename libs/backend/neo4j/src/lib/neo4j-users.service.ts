import { Injectable, Logger } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@avans-nx-workshop/backend/user';
import { Types } from 'mongoose';
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
  async unfavoriteGame(userId: string, gameTitle: string): Promise<void> {
    await this.neo4jService.write(`
    MATCH (u:User {id: $userId})-[f:FAVORITED]->(g:Game {title: $gameTitle})
    DELETE f
  `, { userId, gameTitle });
  }


  async befriendUsers(user1: string, user2: string): Promise<void> {
    await this.neo4jService.write(
      `
    MERGE (u1:User {id: $user1})
    MERGE (u2:User {id: $user2})
    MERGE (u1)-[:FRIENDS_WITH]->(u2)
    MERGE (u2)-[:FRIENDS_WITH]->(u1)
    `,
      { user1, user2 }
    );
  }

  async findUsersToBefriend(userId: string): Promise<any[]> {
    try {
      const query = `
  MATCH (me:User {id: $userId})
  MATCH (other:User)
  WHERE other.id <> me.id
  OPTIONAL MATCH (me)-[r:FRIENDS_WITH]-(other)
  WHERE r IS NULL
  RETURN DISTINCT other.id AS userId
`;




      const result = await this.neo4jService.read(query, { userId });
      const userIds = result.records.map(r => r.get('userId'));

      if (!userIds.length) return [];

      const validUserIds = userIds.filter(id => Types.ObjectId.isValid(id));

      const users = await this.userModel
        .find({ _id: { $in: validUserIds.map(id => new Types.ObjectId(id)) } })
        .select('name emailAddress profileImgUrl')
        .exec();



      return users;

    } catch (err) {
      console.error('Error in findUsersToBefriend:', err);
      throw new Error(`Kon suggesties niet ophalen: ${err.message}`);
    }
  }



  async unfriendUsers(user1: string, user2: string): Promise<void> {
    await this.neo4jService.write(`
    MATCH (u1:User {id: $user1})-[r:FRIENDS_WITH]->(u2:User {id: $user2})
    DELETE r
  `, { user1, user2 });

    await this.neo4jService.write(`
    MATCH (u2:User {id: $user2})-[r:FRIENDS_WITH]->(u1:User {id: $user1})
    DELETE r
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

    
    const objectIds = friendIds.map(id => new Types.ObjectId(id));

    const mongoUsers = await this.userModel
      .find({ _id: { $in: objectIds } })
      .select('name emailAddress profileImgUrl')
      .exec();

    return mongoUsers;
  }

}
