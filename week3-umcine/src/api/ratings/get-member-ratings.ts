import { apiClient } from "../api-client";
import type { Rating } from "./models";

// 공개 API라 토큰 없이 요청함. 다른 API와 달리 배열을 그대로 돌려줌
export function getMemberRatings(memberId: number) {
  return apiClient.get(`members/${memberId}/ratings`).json<Rating[]>();
}
