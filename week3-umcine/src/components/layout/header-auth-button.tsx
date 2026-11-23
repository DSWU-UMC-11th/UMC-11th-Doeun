"use client";

import Link from "next/link";
import { useMeQuery } from "@/hooks/use-me-query";
import { useAuthStore } from "@/stores/auth-store";

const headerButtonClassName =
  "flex h-[42px] items-center rounded-lg border border-white bg-[#2563EB] px-4 text-sm font-extrabold text-white";

const skeleton = <span className="h-[42px] w-24 animate-pulse rounded-lg bg-gray-200" />;

// 로그인 상태(localStorage 토큰)에 따라 달라지는 버튼
export function HeaderAuthButton() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const meQuery = useMeQuery();

  // 서버 렌더링과 첫 브라우저 렌더링에서는 토큰을 알 수 없으므로 스켈레톤 표시
  if (!hasHydrated) return skeleton;

  if (!accessToken) {
    return (
      <Link href="/login" className={headerButtonClassName}>
        로그인
      </Link>
    );
  }

  if (meQuery.isLoading) return skeleton;

  return (
    <Link href="/my" className={headerButtonClassName}>
      마이페이지
    </Link>
  );
}
