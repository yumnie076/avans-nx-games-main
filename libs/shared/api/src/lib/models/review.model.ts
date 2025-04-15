export interface Review {
  _id: string;
  gameId: string;
  userId: string | {
    _id: string;
    name: string;
    emailAddress: string;
  };
  rating: number;
  comment?: string;
  createdAt?: string;
  updatedAt?: string;
}
