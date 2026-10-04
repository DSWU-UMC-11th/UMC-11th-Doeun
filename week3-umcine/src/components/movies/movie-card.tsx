import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { BookmarkButton } from "../bookmark-button";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
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
          <div className="absolute right-2 top-2">
            <BookmarkButton movieId={movie.id} />
          </div>
      </div>
      <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
        <h2 className="mt-3 truncate text-sm font-medium text-[#17191E]">{movie.title}</h2>
        <p className="text-xs text-[#606774]">{movie.releaseDate}</p>
      </Link>
    </article>
  );
}
