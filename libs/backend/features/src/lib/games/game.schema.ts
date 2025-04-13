import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Game extends Document {
  @Prop({ required: true })
  title!: string;

  @Prop()
  releaseDate!: Date;

  @Prop()
  isMultiplayer!: boolean;

  @Prop()
  description?: string;

  @Prop()
  minPlayers?: number;

  @Prop()
  maxPlayers?: number;

  @Prop()
  genre?: string;

  @Prop()
  languageIndependent?: boolean;
}

export const GameSchema = SchemaFactory.createForClass(Game);
