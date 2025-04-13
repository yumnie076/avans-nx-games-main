import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
export const FavoriteModelName = 'Favorite';

@Schema({ timestamps: true })
export class Favorite extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Game', required: true })
  game!: Types.ObjectId;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
