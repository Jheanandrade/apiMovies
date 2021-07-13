import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  Res,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { HttpStatus } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post('/favorites')
  async create(@Body() createMovieDto: CreateMovieDto, @Res() res) {
    try {
      const favoriteMovies = await this.moviesService.create(createMovieDto);

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Your request processed with success',
        data: favoriteMovies,
      });
    } catch (error) {
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(@Res() res, @Query('movie') movie: string) {
    try {
      const getAll = await this.moviesService.findAll(movie);

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Your request processed with success',
        data: getAll,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/favorites')
  async getFavorites(@Res() res) {
    try {
      const getOne = await this.moviesService.find();

      console.log(getOne);

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Your request processed with success',
        data: getOne,
      });
    } catch (error) {
      throw new HttpException(
        error.toString(),
        error.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/favorites/:id')
  async remove(@Res() res, @Param('id') id: string) {
    try {
      await this.moviesService.remove(id);

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Your request processed with success',
      });
    } catch (error) {
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
