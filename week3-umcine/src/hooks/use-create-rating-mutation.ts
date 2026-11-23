import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ratingKeys } from "@/api/query-keys";
import { createRating } from "@/api/ratings/create-rating";
import type { Rating } from "@/api/ratings/models";
import { useMemberId } from "./use-member-id";

export function useCreateRatingMutation() {
  const queryClient = useQueryClient();
  const memberId = useMemberId();

  return useMutation({
    mutationFn: createRating,
    onSuccess: (rating) => {
      // 목록은 최신순이므로 새 평점을 맨 앞에 추가
      queryClient.setQueryData<Rating[]>(ratingKeys.member(memberId), (prev) =>
        prev && [rating, ...prev],
      );
      alert("평점을 등록했어요.");
    },
    onError: () => {
      alert("평점을 등록하지 못했어요. 다시 시도해 주세요.");
      // 이미 평점이 있는 경우(409)처럼 화면과 서버 상태가 다를 수 있으니 다시 조회
      queryClient.invalidateQueries({ queryKey: ratingKeys.member(memberId) });
    },
  });
}
