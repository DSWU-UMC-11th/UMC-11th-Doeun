import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "@/api/favorites/get-favorites";
import { favoriteKeys } from "@/api/query-keys";
import { useMemberId } from "./use-member-id";

export function useFavoritesQuery() {
  const memberId = useMemberId();

  return useQuery({
    queryKey: favoriteKeys.list(memberId),
    queryFn: getFavorites,
    enabled: memberId !== null,
    retry: false,
  });
}
