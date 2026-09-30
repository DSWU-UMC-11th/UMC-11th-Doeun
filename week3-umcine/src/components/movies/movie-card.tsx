import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { cn } from "../../utils/cn";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <article>
      <div className="relative overflow-hidden rounded-xl bg-gray-100">
        <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
          <img
            src={movie.posterPath}
            alt={movie.title}
            className="aspect-2/3 w-full object-cover"
          />
        </Link>
        <button
          className={cn(
            "absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-md border",
            movie.isBookmarked
              ? "border-[#2563EB] bg-[#2563EB]"
              : "border-[#E3E6EB] bg-white/90",
          )}
          aria-pressed={movie.isBookmarked}
          onClick={() => onToggleBookmark(movie.id)}
        >
          <img
            src={movie.isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}
            alt={movie.isBookmarked ? "북마크" : "북마크 안 됨"}
            className={cn("h-3.5 w-3.5", movie.isBookmarked && "invert")}
          />
        </button>
      </div>
      <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
        <h2 className="mt-3 truncate text-sm font-medium text-[#17191E]">{movie.title}</h2>
        <p className="text-xs text-[#606774]">{movie.releaseDate}</p>
      </Link>
    </article>
  );
}
