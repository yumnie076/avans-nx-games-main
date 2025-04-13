import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './review.schema';
import { CreateReviewDto, UpdateReviewDto } from '@avans-nx-workshop/backend/dto';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<Review>) { }

  async create(dto: CreateReviewDto): Promise<Review> {
    return this.reviewModel.create(dto);
  }

  async findAll(): Promise<Review[]> {
    return this.reviewModel.find().populate('gameId userId').exec();
  }

  async update(id: string, dto: UpdateReviewDto): Promise<Review | null> {
    return this.reviewModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: string): Promise<Review | null> {
    return this.reviewModel.findByIdAndDelete(id);
  }
}
