import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb+srv://apiMovies:apiMovies@cluster0.xwzxz.mongodb.net/test',
    ),
    MoviesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
