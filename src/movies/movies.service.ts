import { Movies, MoviesDocument } from './database/entities/movie.entity';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateMovieDto } from './dto/create-movie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MovieModel } from './models/movie';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movies.name) private moviesModel: Model<MoviesDocument>,
  ) {}

  create(createMovieDto: CreateMovieDto) {
    const movie = new this.moviesModel({ ...createMovieDto, favorite: true });
    return movie.save();
  }

  async findAll(movie: string): Promise<MovieModel[]> {
    const { data } = await axios.get(
      `http://www.omdbapi.com/?apikey=925eba28&s=${movie}`,
    );

    const mapFavorites = new Map();

    const favorites = await this.find();

    favorites.forEach((favorite) => {
      mapFavorites.set(favorite.imdbID, true);
    });

    return data.Search.map((movie) => ({
      title: movie.Title,
      imdbID: movie.imdbID,
      year: movie.Year,
      favorite: mapFavorites.has(movie.imdbID),
    }));
  }

  find() {
    return this.moviesModel.find();
  }

  remove(id: string) {
    return this.moviesModel.deleteOne({ _id: id }).exec();
  }
}
