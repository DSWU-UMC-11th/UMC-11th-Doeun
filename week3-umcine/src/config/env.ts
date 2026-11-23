// NEXT_PUBLIC_ 접두사가 붙은 환경 변수만 브라우저 번들에 포함돼요.
// 빌드 시점에 값이 치환되므로 process.env.NEXT_PUBLIC_XXX 형태로 직접 접근해야 해요.
const tmdbApiBaseUrl = process.env.NEXT_PUBLIC_TMDB_API_BASE_URL;
const tmdbAccessToken = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;

if (!tmdbApiBaseUrl || !tmdbAccessToken) {
  throw new Error("TMDB 환경 변수가 필요해요.");
}

export const env = {
  tmdbApiBaseUrl,
  tmdbAccessToken,
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
};
