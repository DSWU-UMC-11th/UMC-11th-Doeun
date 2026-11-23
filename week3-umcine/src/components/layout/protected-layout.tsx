"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuthStore } from "@/stores/auth-store";

// 로그인 후에만 접근할 수 있는 페이지의 공통 레이아웃
// 토큰이 localStorage에 있어서 서버에서는 알 수 없으므로 브라우저에서 확인해요.
export function ProtectedLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  // 토큰이 없거나, 페이지를 보는 중에 401로 토큰이 비워지면 로그인 페이지로 이동
  useEffect(() => {
    if (hasHydrated && !accessToken) router.replace("/login");
  }, [hasHydrated, accessToken, router]);

  if (!hasHydrated || !accessToken) {
    return (
      <main className="flex flex-1 items-center justify-center text-[#606774]">
        로딩 중...
      </main>
    );
  }

  return children;
}
