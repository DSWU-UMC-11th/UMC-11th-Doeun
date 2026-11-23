import { useAuthStore } from "@/stores/auth-store";
import { getMemberIdFromToken } from "@/utils/auth/get-member-id";

// 로그인한 회원의 ID. 로그인 전이면 null
export function useMemberId() {
  return useAuthStore((state) => getMemberIdFromToken(state.accessToken));
}
