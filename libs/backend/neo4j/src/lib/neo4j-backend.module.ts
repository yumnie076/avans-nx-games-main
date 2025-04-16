import { Module } from '@nestjs/common';
import { Neo4jModule } from 'nest-neo4j';
import { Neo4jController } from './neo4j.controller';
import { Neo4JUserService } from './neo4j-users.service';
import { UsersModule } from '@avans-nx-workshop/backend/user';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/shareameal'),

    Neo4jModule.forRoot({
      scheme: 'neo4j+s',
      host: '47f26a70.databases.neo4j.io',
      port: 7687,
      username: 'neo4j',
      password: 's2yM1NAA1Nc9evPSXB3UDZucwW6xLYb9G0S7izNNXcw',
    }),
    UsersModule,
  ],
  controllers: [Neo4jController],
  providers: [Neo4JUserService],
  exports: [Neo4JUserService],
})
export class Neo4jBackendModule { }
