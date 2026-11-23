"use client";

import { useRouter } from "next/navigation";
import { useAddFavoriteMutation } from "@/hooks/use-add-favorite-mutation";
import { useFavoritesQuery } from "@/hooks/use-favorites-query";
import { useMemberId } from "@/hooks/use-member-id";
import { useRemoveFavoriteMutation } from "@/hooks/use-remove-favorite-mutation";
import { useAuthStore } from "@/stores/auth-store";
import { cn } from "@/utils/cn";

interface BookmarkButtonProps {
  movieId: number;
  isFavorite: boolean;
  // 즐겨찾기 여부를 불러오는 중이면 누를 수 없음
  isLoading?: boolean;
}

export function BookmarkButton({ movieId, isFavorite, isLoading = false }: BookmarkButtonProps) {
  const router = useRouter();
  const memberId = useMemberId();
  // localStorage의 토큰을 읽기 전에는 로그인 여부를 알 수 없으므로 잠시 비활성화
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const addFavoriteMutation = useAddFavoriteMutation();
  const removeFavoriteMutation = useRemoveFavoriteMutation();
  const isPending = addFavoriteMutation.isPending || removeFavoriteMutation.isPending;
  const isDisabled = isLoading || isPending || !hasHydrated;

  const handleClick = () => {
    // 즐겨찾기는 로그인 후에만 사용할 수 있음
    if (memberId === null) {
      router.push("/login");
      return;
    }
    if (isDisabled) return;

    if (isFavorite) {
      removeFavoriteMutation.mutate(movieId);
    } else {
      addFavoriteMutation.mutate(movieId);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isDisabled}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm",
        "disabled:cursor-not-allowed disabled:opacity-60",
      )}
    >
      <img
        src={isFavorite ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}
        alt=""
        className="h-5 w-5"
      />
    </button>
  );
}

// 영화 목록 화면용. 영화마다 따로 조회하지 않고, 한 번 불러온 즐겨찾기 목록 캐시를 함께 씀
export function ListBookmarkButton({ movieId }: { movieId: number }) {
  const favoritesQuery = useFavoritesQuery();
  const isFavorite =
    favoritesQuery.data?.some((favorite) => favorite.movieId === movieId) ?? false;

  return (
    <BookmarkButton
      movieId={movieId}
      isFavorite={isFavorite}
      isLoading={favoritesQuery.isLoading}
    />
  );
}
