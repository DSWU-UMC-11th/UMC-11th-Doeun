import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchPage } from "@/views/movies/search-page";

export const metadata: Metadata = { title: "영화 검색 | UMCine" };

export default function Page() {
  // SearchPage는 useSearchParams로 검색어를 읽으므로,
  // 빌드 시 미리 렌더링할 수 없는 부분을 Suspense로 감싸요.
  return (
    <Suspense fallback={<main className="flex-1 bg-[#F6F7F9]" />}>
      <SearchPage />
    </Suspense>
  );
}
