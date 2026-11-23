import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFavorite } from "@/api/favorites/add-favorite";
import type { FavoriteStatus } from "@/api/favorites/get-favorite-status";
import type { Favorite } from "@/api/favorites/models";
import { favoriteKeys } from "@/api/query-keys";
import { useMemberId } from "./use-member-id";

export function useAddFavoriteMutation() {
  const queryClient = useQueryClient();
  const memberId = useMemberId();

  return useMutation({
    mutationFn: addFavorite,
    onSuccess: (favorite, movieId) => {
      // 응답에 등록 결과가 있으므로 다시 조회하지 않고 캐시를 직접 갱신
      queryClient.setQueryData<FavoriteStatus>(
        favoriteKeys.status(memberId, movieId),
        { isFavorite: true },
      );
      queryClient.setQueryData<Favorite[]>(favoriteKeys.list(memberId), (prev) =>
        prev && [favorite, ...prev.filter((item) => item.movieId !== movieId)],
      );
    },
    onError: () => {
      alert("즐겨찾기에 추가하지 못했어요. 다시 시도해 주세요.");
      // 이미 등록된 경우(409)처럼 화면과 서버 상태가 다를 수 있으니 다시 조회
      queryClient.invalidateQueries({ queryKey: favoriteKeys.all(memberId) });
    },
  });
}
