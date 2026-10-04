import MovieGrid from "../../components/movies/movie-grid";
import { movies } from "../../data/movies";

export function MovieListPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-8 py-8">
      <h1 className="mb-6 text-3xl font-bold text-[#17191E]">영화 목록</h1>
      <MovieGrid movies={movies} />
    </main>
  );
}