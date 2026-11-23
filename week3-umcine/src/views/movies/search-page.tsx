"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { searchMovies } from "../../api/movies/search-movies";
import { ListBookmarkButton } from "../../components/bookmark-button";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

export function SearchPage() {
  // ?query=스파이더맨 형태의 검색어를 읽음 (TanStack Router의 useSearch 대체)
  const query = useSearchParams().get("query") ?? "";
  const router = useRouter();
  const [searchText, setSearchText] = useState(query);

  const normalizedQuery = query.trim();

  const searchQuery = useQuery({
    queryKey: ["movies", "search", { query: normalizedQuery }],
    queryFn: () => searchMovies({ query: normalizedQuery }),
    enabled: normalizedQuery.length > 0,
  });

  const searchResults = searchQuery.data?.results ?? [];

  // 뒤로 가기 등으로 URL의 검색어가 바뀌면 입력창도 맞춰 줌
  // (effect 대신 렌더링 중에 이전 값과 비교해 갱신하는 React 권장 방식)
  const [prevQuery, setPrevQuery] = useState(query);
  if (prevQuery !== query) {
    setPrevQuery(query);
    setSearchText(query);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = searchText.trim();
    router.push(
      nextQuery ? `/search?${new URLSearchParams({ query: nextQuery })}` : "/search",
    );
  }

  if (!normalizedQuery) {
    return (
      <main className="flex flex-1 flex-col items-center bg-[#F6F7F9] px-[72px] py-[209px]">
        <div className="flex w-[790px] flex-col items-center gap-9">
          <h1 className="text-center text-[46px] font-bold leading-[52px] tracking-[-2.3px] text-[#17191E]">
            어떤 영화를 찾고 있나요?
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex h-[74px] w-full items-center gap-3.5 rounded-xl border-2 border-[#17191E] bg-white py-0 pl-[21px] pr-[17px] shadow-[0px_12px_34px_rgba(17,19,24,0.08)]"
          >
            <img src="/icons/search.svg" alt="" className="h-6 w-6 opacity-70" />
            <input
              aria-label="검색어"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="예: 스파이더맨"
              className="flex-1 bg-transparent text-[17px] text-[#17191E] placeholder:text-[#969DA8] outline-none"
            />
            <button
              type="submit"
              className="flex h-[42px] w-[59px] items-center justify-center rounded-lg border border-[#17191E] bg-[#17191E] text-sm font-extrabold text-white"
            >
              검색
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-[#F6F7F9] px-20 py-6">
      <div className="mb-4 flex flex-col gap-[17px]">
        <h1 className="text-[38px] font-bold leading-[44px] tracking-[-1.71px] text-[#17191E]">
          영화 검색
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex h-[54px] items-center gap-[18px] rounded-[9px] border border-[#E3E6EB] bg-white py-0 pl-[15px] pr-[10px]"
        >
          <img src="/icons/search.svg" alt="" className="h-6 w-6 opacity-70" />
          <input
            aria-label="검색어"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            className="flex-1 bg-transparent text-sm font-bold text-[#17191E] outline-none"
          />
          {searchText && (
            <button
              type="button"
              onClick={() => setSearchText("")}
              aria-label="검색어 지우기"
            >
              <img src="/icons/close.svg" alt="" className="h-6 w-6 opacity-70" />
            </button>
          )}
          <button
            type="submit"
            className="flex h-[42px] w-[86px] items-center justify-center rounded-lg border border-white bg-[#17191E] text-sm font-extrabold text-white"
          >
            다시 검색
          </button>
        </form>
      </div>

      <div className="flex items-center justify-between border-y border-[#E3E6EB] py-4">
        <h2 className="text-lg font-bold text-[#17191E]">&apos;{query}&apos; 검색 결과</h2>
        <span className="text-xs text-[#969DA8]">영화 {searchResults.length}편</span>
      </div>

      {searchQuery.isLoading ? (
        <p className="py-10 text-[#606774]">검색 중...</p>
      ) : searchQuery.isError ? (
        <p className="py-10 text-red-500">검색 결과를 불러오지 못했어요.</p>
      ) : searchQuery.isSuccess && searchResults.length === 0 ? (
        <p className="py-10 text-[#606774]">검색 결과가 없어요.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-5">
          {searchResults.map((movie) => {
            const posterUrl = getTmdbPosterUrl(movie.poster_path);

            return (
              <li key={movie.id} className="flex gap-[18px] py-5">
                <div className="h-[190px] w-[126px] flex-shrink-0 overflow-hidden rounded-[10px] bg-[#F6F7F9]">
                  {posterUrl && (
                    <img
                      src={posterUrl}
                      alt={`${movie.title} 포스터`}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <h3 className="text-lg font-bold leading-6 text-[#17191E]">
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#969DA8]">
                    <span>{movie.original_title}</span>
                    <span>{movie.release_date}</span>
                  </div>
                  <p className="line-clamp-2 text-[12.5px] leading-5 text-[#606774]">
                    {movie.overview}
                  </p>
                  <Link
                    href={`/movies/${movie.id}`}
                    className="mt-auto inline-flex w-fit items-center gap-1 text-xs font-extrabold text-[#2563EB]"
                  >
                    상세 보기 →
                  </Link>
                  <ListBookmarkButton movieId={movie.id} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
