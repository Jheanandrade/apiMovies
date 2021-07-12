import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://apiMovies:apiMovies@cluster0.xwzxz.mongodb.net/test',
    ),
    MoviesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
