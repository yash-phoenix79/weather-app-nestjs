import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';
import { WeatherModule } from './weather/weather.module';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WeatherModule,
    HttpModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 360000, // default cache ttl
      max: 100,
    })
    // RedisModule.forRootAsync({
    //   useFactory: (configService) => ({
    //     config: {
    //       host: configService.get('REDIS_HOST'),
    //       port: configService.get('redis.port'),
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
