export class CreateReviewDto {
  gameId!: string;
  userId!: string;
  rating!: number;
  comment?: string;
}

export class UpdateReviewDto {
  gameId?: string;
  userId?: string;
  rating?: number;
  comment?: string;
}
