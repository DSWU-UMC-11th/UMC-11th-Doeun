import type { Metadata } from "next";
import { GuestOnly } from "@/components/layout/guest-only";
import { LoginPage } from "@/views/auth/login-page";

export const metadata: Metadata = { title: "로그인 | UMCine" };

export default function Page() {
  return (
    <GuestOnly>
      <LoginPage />
    </GuestOnly>
  );
}
