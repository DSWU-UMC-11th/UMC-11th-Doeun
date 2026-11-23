import { Suspense } from "react";
import { MovieDetailPage } from "@/views/movies/movie-detail-page";

type MovieDetailRouteProps = PageProps<"/movies/[movieId]">;

const loadingFallback = (
  <main className="flex flex-1 items-center justify-center text-[#606774]">
    로딩 중...
  </main>
);

export default function Page({ params }: MovieDetailRouteProps) {
  // params는 요청 시점에야 알 수 있으므로 Suspense 안에서 읽어요.
  return (
    <Suspense fallback={loadingFallback}>
      <MovieDetail params={params} />
    </Suspense>
  );
}

// Server Component에서 URL 파라미터를 읽어 Client Component에 props로 전달
async function MovieDetail({ params }: Pick<MovieDetailRouteProps, "params">) {
  const { movieId } = await params;
  return <MovieDetailPage movieIdParam={movieId} />;
}
