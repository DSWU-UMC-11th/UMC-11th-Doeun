import { authApi } from "../auth-api";
import type { ApiResponse } from "../models";

export interface FavoriteStatus {
  isFavorite: boolean;
}

export async function getFavoriteStatus(movieId: number): Promise<FavoriteStatus> {
  const response = await authApi
    .get(`favorites/${movieId}`)
    .json<ApiResponse<FavoriteStatus>>();
  return response.result;
}
