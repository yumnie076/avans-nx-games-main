import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Tag {
  @Prop({ required: true })
  name!: string;
}

@Schema()
export class Game extends Document {
  @Prop({ required: true, index: true })
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

  @Prop({ index: true })
  genre?: string;

  @Prop()
  languageIndependent?: boolean;

  // ➕ EMBEDDING: tags direct in Game opgeslagen
  @Prop({ type: [Tag] })
  tags?: Tag[];
}

export const GameSchema = SchemaFactory.createForClass(Game);
