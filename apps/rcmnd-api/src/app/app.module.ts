
import * as dotenv from 'dotenv';
dotenv.config();

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Neo4jModule } from 'nest-neo4j';
import { Neo4jBackendModule } from '@avans-nx-workshop/backend/neo4j';

console.log('Neo4j User:', process.env.NEO4J_USER);
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    Neo4jModule.forRootAsync({
      useFactory: () => ({
        scheme: 'neo4j+s',
        host: '47f26a70.databases.neo4j.io',
        port: 7687,
        username: process.env.NEO4J_USER,
        password: process.env.NEO4J_PASSWORD,

      }),
    }),
    Neo4jBackendModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
