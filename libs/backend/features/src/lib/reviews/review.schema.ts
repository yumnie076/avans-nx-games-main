import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
export const ReviewModelName = 'Review';

@Schema({ timestamps: true })
export class Review extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Game', required: true, index: true })
  gameId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId!: Types.ObjectId;

  @Prop({ required: true })
  rating!: number;

  @Prop()
  comment?: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
