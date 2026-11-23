import { ProtectedLayout } from "@/components/layout/protected-layout";

// (protected) 그룹 아래 페이지는 로그인 후에만 볼 수 있어요.
export default function Layout({ children }: { children: React.ReactNode }) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}
