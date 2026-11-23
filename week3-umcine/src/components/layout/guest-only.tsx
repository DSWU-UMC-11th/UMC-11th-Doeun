"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuthStore } from "@/stores/auth-store";

// 이미 로그인한 사용자는 메인 페이지로 이동 (로그인 페이지용)
export function GuestOnly({ children }: { children: ReactNode }) {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    if (hasHydrated && accessToken) router.replace("/");
  }, [hasHydrated, accessToken, router]);

  if (hasHydrated && accessToken) return null;

  return children;
}
