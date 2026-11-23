export interface Rating {
  ratingId: number;
  movieId: number;
  // 1~5점
  score: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
}
