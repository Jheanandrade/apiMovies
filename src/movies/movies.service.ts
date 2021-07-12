import { Movies, MoviesDocument } from './entities/movie.entity';
import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movies.name) private moviesModel: Model<MoviesDocument>,
  ) {}

  create(createMovieDto: CreateMovieDto) {
    const movie = new this.moviesModel(createMovieDto);
    return movie.save();
  }

  findAll() {
    return this.moviesModel.find();
  }

  findOne(id: string) {
    return this.moviesModel.findById(id);
  }

  update(id: string, updateMovieDto: UpdateMovieDto) {
    return this.moviesModel.findByIdAndUpdate(
      { _id: id },
      { $set: updateMovieDto },
      { new: true },
    );
  }

  remove(id: string) {
    return this.moviesModel.deleteOne({ _id: id }).exec();
  }
}
