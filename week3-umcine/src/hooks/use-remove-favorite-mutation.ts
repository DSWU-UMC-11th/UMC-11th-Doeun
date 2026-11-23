import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FavoriteStatus } from "@/api/favorites/get-favorite-status";
import type { Favorite } from "@/api/favorites/models";
import { removeFavorite } from "@/api/favorites/remove-favorite";
import { favoriteKeys } from "@/api/query-keys";
import { useMemberId } from "./use-member-id";

export function useRemoveFavoriteMutation() {
  const queryClient = useQueryClient();
  const memberId = useMemberId();

  return useMutation({
    mutationFn: removeFavorite,
    onSuccess: (_, movieId) => {
      // 해제한 영화만 빼면 되므로 다시 조회하지 않고 캐시를 직접 갱신
      queryClient.setQueryData<FavoriteStatus>(
        favoriteKeys.status(memberId, movieId),
        { isFavorite: false },
      );
      queryClient.setQueryData<Favorite[]>(favoriteKeys.list(memberId), (prev) =>
        prev?.filter((item) => item.movieId !== movieId),
      );
    },
    onError: () => {
      alert("즐겨찾기를 해제하지 못했어요. 다시 시도해 주세요.");
      // 이미 해제된 경우(404)처럼 화면과 서버 상태가 다를 수 있으니 다시 조회
      queryClient.invalidateQueries({ queryKey: favoriteKeys.all(memberId) });
    },
  });
}
