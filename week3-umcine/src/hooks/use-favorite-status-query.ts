import { useQuery } from "@tanstack/react-query";
import { getFavoriteStatus } from "@/api/favorites/get-favorite-status";
import { favoriteKeys } from "@/api/query-keys";
import { useMemberId } from "./use-member-id";

export function useFavoriteStatusQuery(movieId: number) {
  const memberId = useMemberId();

  return useQuery({
    queryKey: favoriteKeys.status(memberId, movieId),
    queryFn: () => getFavoriteStatus(movieId),
    enabled: memberId !== null,
    retry: false,
  });
}
