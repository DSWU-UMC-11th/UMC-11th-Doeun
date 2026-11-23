"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import { BookmarkButton } from "../../components/bookmark-button";
import { MyRatingCard } from "../../components/movies/my-rating-card";
import { useFavoriteStatusQuery } from "../../hooks/use-favorite-status-query";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
import {
  getTmdbBackdropUrl,
  getTmdbPosterUrl,
} from "../../utils/movies/tmdb-image";

function formatRuntime(runtime: number | null) {
  if (typeof runtime !== "number" || runtime <= 0) {
    return "상영 시간 정보가 없어요.";
  }

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  if (hours === 0) return `${minutes}분`;
  if (minutes === 0) return `${hours}시간`;
  return `${hours}시간 ${minutes}분`;
}

interface MovieDetailPageProps {
  // Server Component(app/movies/[movieId]/page.tsx)가 URL에서 읽어 전달
  movieIdParam: string;
}

export function MovieDetailPage({ movieIdParam }: MovieDetailPageProps) {
  const movieId = Number(movieIdParam);
  const isValidMovieId = Number.isInteger(movieId) && movieId > 0;

  const movieDetailQuery = useQuery({
    queryKey: ["movies", "detail", movieId],
    queryFn: () => getMovieDetail(movieId),
    enabled: isValidMovieId,
    staleTime: 30 * 1000,
  });

  if (!isValidMovieId) {
    return (
      <main className="flex flex-1 items-center justify-center text-[#606774]">
        올바르지 않은 영화 번호예요.
      </main>
    );
  }

  if (movieDetailQuery.isPending) {
    return (
      <main className="flex flex-1 items-center justify-center text-[#606774]">
        로딩 중...
      </main>
    );
  }

  if (movieDetailQuery.isError) {
    return (
      <main className="flex flex-1 items-center justify-center text-[#606774]">
        {getMovieDetailErrorMessage(movieDetailQuery.error)}
      </main>
    );
  }

  const movie = movieDetailQuery.data;
  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);
  const posterUrl = getTmdbPosterUrl(movie.poster_path);
  const genreText = movie.genres.map((genre) => genre.name).join(", ");

  return (
    <main className="flex flex-1 flex-col">
      <div className="relative h-80 w-full overflow-hidden bg-[#17191E] sm:h-96">
        {backdropUrl && (
          <img
            src={backdropUrl}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-6xl px-8 pb-6">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-1 text-sm text-white hover:text-gray-200"
          >
            <img src="/icons/chevron-left.svg" alt="" className="h-4 w-4 invert" />
            목록으로
          </Link>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">{movie.title}</h1>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-8 py-6">
        <p className="text-sm text-[#606774]">{movie.original_title}</p>
        <p className="mt-1 text-sm text-[#606774]">
          {[genreText, movie.release_date, formatRuntime(movie.runtime)]
            .filter(Boolean)
            .join(" · ")}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          <div className="flex gap-5 rounded-xl border border-[#E3E6EB] bg-white p-5">
            <div className="h-44 w-32 flex-shrink-0 overflow-hidden rounded-lg bg-[#F6F7F9]">
              {posterUrl && (
                <img
                  src={posterUrl}
                  alt={`${movie.title} 포스터`}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <div className="flex flex-col gap-3">
              {movie.tagline && (
                <h2 className="font-semibold text-[#17191E]">{movie.tagline}</h2>
              )}
              <p className="text-sm text-[#606774]">{movie.overview}</p>
              <MovieFavoriteButton movieId={movie.id} />
            </div>
          </div>

          <MyRatingCard movieId={movie.id} />
        </div>
      </div>
    </main>
  );
}

// 상세 화면에서는 이 영화 하나의 즐겨찾기 여부를 조회함
function MovieFavoriteButton({ movieId }: { movieId: number }) {
  const favoriteStatusQuery = useFavoriteStatusQuery(movieId);

  return (
    <BookmarkButton
      movieId={movieId}
      isFavorite={favoriteStatusQuery.data?.isFavorite ?? false}
      isLoading={favoriteStatusQuery.isLoading}
    />
  );
}
