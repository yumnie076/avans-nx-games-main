import { Types } from 'mongoose';

export interface Favorite {
  _id?: string;
  user: Types.ObjectId | string;
  game: Types.ObjectId | string;
  createdAt?: Date;
}
