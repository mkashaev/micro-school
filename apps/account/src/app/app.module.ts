import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from './configs/mongo.configs';

@Module({
  imports: [
    MongooseModule.forRootAsync(getMongoConfig()),
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'env/.account.env' }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
