import { useState, useEffect } from "react";
import MovieGrid from "../../components/movies/movie-grid";
import { getMovies } from "../../api/movies/get-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";

export function MovieListPage() {
  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    async function loadMovies() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await getMovies({ page: 1 });
        if (!ignore) setMovies(response.results);
      } catch {
        if (!ignore) setErrorMessage("영화 목록을 불러오지 못했어요.");
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadMovies();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-8 py-8">
      <h1 className="mb-6 text-3xl font-bold text-[#17191E]">영화 목록</h1>
      {isLoading && <p>로딩 중...</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {!isLoading && !errorMessage && movies.length === 0 && (
        <p className="text-[#606774]">표시할 영화가 없어요.</p>
      )}
      {!isLoading && !errorMessage && movies.length > 0 && (
        <MovieGrid movies={movies} />
      )}
    </main>
  );
}
