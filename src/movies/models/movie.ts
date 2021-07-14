import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MovieModel {
  @IsNotEmpty()
  @ApiProperty({ required: false })
  id: string;

  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @ApiProperty()
  imdbID: string;

  @IsNotEmpty()
  @ApiProperty()
  year: number;

  @IsNotEmpty()
  @ApiProperty()
  favorite: boolean;
}
