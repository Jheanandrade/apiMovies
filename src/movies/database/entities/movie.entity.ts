import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MoviesDocument = Movies & Document;

@Schema()
export class Movies {
  @Prop()
  title: string;

  @Prop()
  imdbID: string;

  @Prop()
  year: number;

  @Prop()
  favorite: boolean;
}

export const MoviesSchema = SchemaFactory.createForClass(Movies);
