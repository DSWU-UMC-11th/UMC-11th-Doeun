import { Link, useParams } from "@tanstack/react-router";
import { movies } from "../../data/movies";
import { BookmarkButton } from "../../components/bookmark-button";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find((item) => item.id === Number(movieId));

  if (!movie) {
    return (
      <main className="flex flex-1 items-center justify-center text-[#606774]">
        영화를 찾을 수 없어요.
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col">
      <div className="relative h-80 w-full overflow-hidden sm:h-96">
        <img
          src={movie.backdropPath}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-6xl px-8 pb-6">
          <Link
            to="/"
            className="mb-4 inline-flex items-center gap-1 text-sm text-white hover:text-gray-200"
          >
            <img src="/icons/chevron-left.svg" alt="" className="h-4 w-4 invert" />
            목록으로
          </Link>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">{movie.title}</h1>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-8 py-6">
        <p className="text-sm text-[#606774]">{movie.originalTitle}</p>
        <p className="mt-1 text-sm text-[#606774]">
          {movie.genres.join(" · ")} · {movie.releaseDate} · {movie.runtime}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          <div className="flex gap-5 rounded-xl border border-[#E3E6EB] bg-white p-5">
            <img
              src={movie.posterPath}
              alt={`${movie.title} 포스터`}
              className="h-44 w-32 flex-shrink-0 rounded-lg object-cover"
            />
            <div className="flex flex-col gap-3">
              <h2 className="font-semibold text-[#17191E]">{movie.tagline}</h2>
              <p className="text-sm text-[#606774]">{movie.overview}</p>
                <BookmarkButton movieId={movie.id} />
            </div>
          </div>

          <div className="rounded-xl border border-[#E3E6EB] bg-white p-5">
            <h2 className="mb-3 font-semibold text-[#17191E]">내 평점</h2>
            <div className="mb-4 flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <img key={n} src="/icons/star-outline.svg" alt="" className="h-5 w-5" />
              ))}
            </div>
            <textarea
              placeholder="리뷰를 남겨보세요"
              className="h-24 w-full resize-none rounded-lg border border-[#E3E6EB] bg-white p-3 text-sm text-[#17191E] placeholder:text-[#9AA1AC] outline-none"
            />
            <button className="mt-3 w-full rounded-lg bg-[#17191E] py-2 text-sm font-semibold text-white hover:bg-[#2b2e37]">
              리뷰 저장
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
