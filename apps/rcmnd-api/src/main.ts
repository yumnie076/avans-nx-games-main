/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';
import { ApiResponseInterceptor } from '@avans-nx-workshop/backend/dto';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);

    const corsOptions: CorsOptions = {};
    app.enableCors(corsOptions);

    app.useGlobalInterceptors(new ApiResponseInterceptor());

    const port = process.env.PORT || 3100;
    await app.listen(port);
    Logger.log(
        ` RCMND server is running on: http://localhost:${port}/${globalPrefix}`
    );
}

bootstrap();
