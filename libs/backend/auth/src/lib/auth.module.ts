import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema, UsersModule } from '@avans-nx-workshop/backend/user';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guards'; 

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UsersModule,
    JwtModule.register({
      secret: process.env['JWT_SECRET'] || 'secretstring',
      signOptions: { expiresIn: '12 days' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, AuthGuard, JwtModule] 
})
export class AuthModule { }
