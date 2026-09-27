import type { Movie } from "../types/movie";


interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void
}

export default function MovieCard({movie, onToggleBookmark}: MovieCardProps){

    return (
        <article className="movie-card">
          <div className="poster-wrap">
            <img className="poster" src={movie.posterPath} alt={movie.title} />
            <button
              className="bookmark-button"
              aria-pressed={movie.isBookmarked}
              onClick={() => onToggleBookmark(movie.id)}
            >
              {movie.isBookmarked
                ? <img src="/icons/bookmark.svg" alt="북마크" />
                : <img src="/icons/bookmark-outline.svg" alt="북마크 안 됨" />}
            </button>
          </div>
          <h2 className="movie-title">{movie.title}</h2>
          <p className="movie-date">{movie.releaseDate}</p>
        </article>
    );
}
