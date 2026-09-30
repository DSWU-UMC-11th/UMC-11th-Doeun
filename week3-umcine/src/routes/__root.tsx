import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Header } from "../components/layout/header";
import { Footer } from "../components/layout/footer";

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-screen flex-col bg-white text-[#17191E]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  ),
  notFoundComponent: () => (
    <main className="flex flex-1 items-center justify-center text-[#606774]">
      페이지를 찾을 수 없어요.
    </main>
  ),
});
