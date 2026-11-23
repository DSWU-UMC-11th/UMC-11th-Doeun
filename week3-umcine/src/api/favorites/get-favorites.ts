import { authApi } from "../auth-api";
import type { ApiResponse } from "../models";
import type { Favorite } from "./models";

// 최근에 즐겨찾기한 영화부터 돌려줌
export async function getFavorites(): Promise<Favorite[]> {
  const response = await authApi.get("favorites").json<ApiResponse<Favorite[]>>();
  return response.result;
}
