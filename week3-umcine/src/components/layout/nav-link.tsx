"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface NavLinkProps {
  href: string;
  // true면 경로가 정확히 같을 때만 활성화 (TanStack Router의 activeOptions.exact 대체)
  exact?: boolean;
  children: ReactNode;
}

// 현재 페이지 메뉴는 진하게 밑줄, 나머지는 회색
const baseClassName = "hover:text-[#17191E]";
const activeClassName = "text-[#17191E] underline";
const inactiveClassName = "text-[#606774]";

export function NavLink(props: NavLinkProps) {
  // /movies/[movieId]처럼 빌드 시점에 경로를 알 수 없는 페이지에서는
  // usePathname이 suspend되므로, 비활성 링크를 fallback으로 보여줘요.
  return (
    <Suspense
      fallback={
        <Link href={props.href} className={cn(baseClassName, inactiveClassName)}>
          {props.children}
        </Link>
      }
    >
      <ActiveAwareLink {...props} />
    </Suspense>
  );
}

function ActiveAwareLink({ href, exact = false, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = exact
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(baseClassName, isActive ? activeClassName : inactiveClassName)}
    >
      {children}
    </Link>
  );
}
