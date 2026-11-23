import Link from "next/link";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";
import { ListBookmarkButton } from "../bookmark-button";

interface MovieCardProps {
  movie: TmdbMovieListItem;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = getTmdbPosterUrl(movie.poster_path);

  return (
    <article>
      <div className="relative overflow-hidden rounded-xl bg-gray-100">
        <Link href={`/movies/${movie.id}`}>
          <div className="aspect-2/3 w-full">
            {posterUrl && (
              <img
                src={posterUrl}
                alt={movie.title}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </Link>
        <div className="absolute right-2 top-2">
          <ListBookmarkButton movieId={movie.id} />
        </div>
      </div>
      <Link href={`/movies/${movie.id}`}>
        <h2 className="mt-3 truncate text-sm font-medium text-[#17191E]">{movie.title}</h2>
        <p className="text-xs text-[#606774]">{movie.release_date}</p>
      </Link>
    </article>
  );
}
