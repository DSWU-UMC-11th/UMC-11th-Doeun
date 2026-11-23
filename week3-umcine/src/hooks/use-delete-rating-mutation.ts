import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ratingKeys } from "@/api/query-keys";
import { deleteRating } from "@/api/ratings/delete-rating";
import type { Rating } from "@/api/ratings/models";
import { useMemberId } from "./use-member-id";

export function useDeleteRatingMutation() {
  const queryClient = useQueryClient();
  const memberId = useMemberId();

  return useMutation({
    mutationFn: deleteRating,
    onSuccess: (_, ratingId) => {
      queryClient.setQueryData<Rating[]>(ratingKeys.member(memberId), (prev) =>
        prev?.filter((item) => item.ratingId !== ratingId),
      );
      alert("평점을 삭제했어요.");
    },
    onError: () => {
      alert("평점을 삭제하지 못했어요. 다시 시도해 주세요.");
      queryClient.invalidateQueries({ queryKey: ratingKeys.member(memberId) });
    },
  });
}
