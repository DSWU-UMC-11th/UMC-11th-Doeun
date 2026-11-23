import { authApi } from "../auth-api";
import type { ApiResponse } from "../models";
import type { Rating } from "./models";

export interface UpdateRatingRequest {
  ratingId: number;
  score: number;
  // 보내지 않으면 서버가 기존 후기를 지우므로 항상 함께 보냄
  comment: string;
}

export async function updateRating({
  ratingId,
  ...body
}: UpdateRatingRequest): Promise<Rating> {
  const response = await authApi
    .patch(`ratings/${ratingId}`, { json: body })
    .json<ApiResponse<Rating>>();
  return response.result;
}
