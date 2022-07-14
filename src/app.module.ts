import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './app/movies/movies.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        ssl: configService.get('NODE_ENV') === "production" ? {rejectUnauthorized: false} : false ,
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
        synchronize: false,
      }),
  }), MoviesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
