import { SharedLibModule } from '@expense-settler-monorepo/shared-lib';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NODE_ENV } from './constants/app.constant';
<<<<<<< HEAD

import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
=======
>>>>>>> 8efff6e (types libs added, env file defined, configmodule defined)

@Module({
  imports: [
    SharedLibModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        NODE_ENV: Joi.string()
          .required()
          .valid(NODE_ENV.DEVELOPMENT, NODE_ENV.PRODUCTION),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required().allow(''),
        POSTGRES_DB: Joi.string().required(),
      }),
    }),
<<<<<<< HEAD
    MongooseModule.forRoot('mongodb://localhost/authentication'),
    UsersModule,
=======
>>>>>>> 8efff6e (types libs added, env file defined, configmodule defined)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
