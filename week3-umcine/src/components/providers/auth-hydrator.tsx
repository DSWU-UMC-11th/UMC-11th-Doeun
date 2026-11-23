"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";

// 브라우저에서만 localStorage에 저장된 토큰을 스토어로 복원
export function AuthHydrator() {
  useEffect(() => {
    useAuthStore.persist.rehydrate();
  }, []);

  return null;
}
