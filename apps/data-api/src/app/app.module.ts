import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '@avans-nx-workshop/shared/util-env';

import { BackendFeaturesMealModule } from '@avans-nx-workshop/backend/features';
import { UsersModule } from '@avans-nx-workshop/backend/user';
import { AuthModule } from '@avans-nx-workshop/backend/auth';
import { BackendFeaturesGameModule } from '@avans-nx-workshop/backend/features'; 

@Module({
  imports: [
    BackendFeaturesMealModule,
    BackendFeaturesGameModule,
    AuthModule,
    MongooseModule.forRoot(environment.MONGO_DB_CONNECTION_STRING, {
      connectionFactory: (connection) => {
        connection.on('connected', () => {
          Logger.verbose(
            `Mongoose db connected to ${environment.MONGO_DB_CONNECTION_STRING}`
          );
        });
        connection._events.connected();
        return connection;
      },
    }),
    UsersModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
