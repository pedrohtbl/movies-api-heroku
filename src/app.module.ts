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
        host: configService.get('DB_HOST','localhost'),
        port: Number(configService.get('DB_PORT',5432)),
        username: configService.get('DB_USERNAME','pedro'),
        password: configService.get('DB_PASSWORD','pedro123'),
        database: configService.get('DB_DATABASE','movies_db'),
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
        synchronize: true,
      }),
  }), MoviesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
