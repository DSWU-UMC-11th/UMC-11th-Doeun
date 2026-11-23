import { useQuery } from "@tanstack/react-query";
import { ratingKeys } from "@/api/query-keys";
import { getMemberRatings } from "@/api/ratings/get-member-ratings";
import { useMemberId } from "./use-member-id";

// 로그인한 회원이 남긴 평점 목록
export function useMyRatingsQuery() {
  const memberId = useMemberId();

  return useQuery({
    queryKey: ratingKeys.member(memberId),
    queryFn: () => getMemberRatings(memberId!),
    enabled: memberId !== null,
    retry: false,
  });
}
