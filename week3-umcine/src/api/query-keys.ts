// 회원마다 결과가 다르므로 key에 memberId를 넣어 다른 계정의 캐시와 섞이지 않게 함
export const favoriteKeys = {
  all: (memberId: number | null) => ["favorites", memberId] as const,
  list: (memberId: number | null) => ["favorites", memberId, "list"] as const,
  status: (memberId: number | null, movieId: number) =>
    ["favorites", memberId, "status", movieId] as const,
};

export const ratingKeys = {
  member: (memberId: number | null) => ["ratings", "member", memberId] as const,
};
