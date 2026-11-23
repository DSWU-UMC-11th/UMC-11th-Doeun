import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ratingKeys } from "@/api/query-keys";
import type { Rating } from "@/api/ratings/models";
import { updateRating } from "@/api/ratings/update-rating";
import { useMemberId } from "./use-member-id";

export function useUpdateRatingMutation() {
  const queryClient = useQueryClient();
  const memberId = useMemberId();

  return useMutation({
    mutationFn: updateRating,
    onSuccess: (rating) => {
      queryClient.setQueryData<Rating[]>(ratingKeys.member(memberId), (prev) =>
        prev?.map((item) => (item.ratingId === rating.ratingId ? rating : item)),
      );
      alert("평점을 수정했어요.");
    },
    onError: () => {
      alert("평점을 수정하지 못했어요. 다시 시도해 주세요.");
      queryClient.invalidateQueries({ queryKey: ratingKeys.member(memberId) });
    },
  });
}
