import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/api/members/me";
import { useAuthStore } from "@/stores/auth-store";

// 헤더와 마이페이지가 같은 내 정보 캐시를 사용함
export function useMeQuery() {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["members", "me"],
    queryFn: getMe,
    // 토큰이 있을 때만 조회
    enabled: Boolean(accessToken),
    // 내 정보는 자주 바뀌지 않으므로 5분 동안 최신으로 취급
    staleTime: 5 * 60 * 1000,
    // 인증 실패로 토큰을 지운 뒤 자동 재시도하지 않음
    retry: false,
  });
}
