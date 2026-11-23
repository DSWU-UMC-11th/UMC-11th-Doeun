import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
  accessToken: string | null;
  // localStorage에서 토큰을 다 읽어왔는지 여부
  hasHydrated: boolean;
  setAccessToken: (accessToken: string | null) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      hasHydrated: false,
      setAccessToken: (accessToken) => set({ accessToken }),
    }),
    {
      name: "umcine-auth-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ accessToken: state.accessToken }),
      // 서버에는 localStorage가 없으므로 자동 복원을 끄고,
      // 브라우저에서 마운트된 뒤 AuthHydrator가 직접 rehydrate()를 호출해요.
      // (서버 HTML과 첫 클라이언트 렌더 결과를 같게 만들어 hydration 오류를 막음)
      skipHydration: true,
      onRehydrateStorage: () => () => {
        useAuthStore.setState({ hasHydrated: true });
      },
    },
  ),
);
