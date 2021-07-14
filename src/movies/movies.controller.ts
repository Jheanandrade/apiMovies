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
import {
  ApiExtraModels,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { HttpStatus } from '@nestjs/common';
import {
  ApiResponseModel,
  ApiResponseModelOnly,
  ApiResponseString,
} from './protocols/api-response';
import { MovieModel } from './models/movie';
import { HttpResponse } from './protocols/http.protocols';

@ApiTags('movies')
@Controller('movies')
@ApiExtraModels(MovieModel, HttpResponse)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post('/favorites')
  @ApiOperation({ summary: 'Add bookmark record' })
  @ApiResponseModelOnly(MovieModel)
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
  @ApiOperation({ summary: 'List all movies' })
  @ApiQuery({ name: 'movie' })
  @ApiResponseModel(MovieModel)
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
  @ApiOperation({ summary: 'List only movies marked as favorites' })
  @ApiResponseModel(MovieModel)
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
  @ApiResponseString()
  @ApiOperation({ summary: 'Remove from favorites' })
  async remove(@Res() res, @Param('id') id: string) {
    try {
      await this.moviesService.remove(id);

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Your movie has been successfully removed from favorites',
      });
    } catch (error) {
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
