import Link from "next/link";
import { HeaderAuthButton } from "./header-auth-button";
import { NavLink } from "./nav-link";

// 정적인 마크업은 Server Component로 두고,
// 현재 경로(usePathname)나 로그인 상태가 필요한 부분만 Client Component로 분리
export function Header() {
  return (
    <header className="flex items-center justify-between bg-white px-20 py-6">
      <div className="flex items-center gap-[42px]">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-[#17191E]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/movie.svg" alt="UMCine" className="h-6 w-6" />
          </span>
          <span className="text-xl font-black tracking-[-0.7px] text-[#17191E]">
            UMCine
          </span>
        </div>
        <nav>
          <ul className="flex items-center gap-[30px] text-sm font-bold">
            <li>
              <NavLink href="/" exact>
                영화
              </NavLink>
            </li>
            <li>
              <NavLink href="/search">검색</NavLink>
            </li>
            <li>
              <NavLink href="/my">내 정보</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex items-center gap-2.5">
        <Link
          href="/search"
          aria-label="영화 검색"
          className="flex h-[42px] w-[42px] items-center justify-center rounded-lg border border-[#E3E6EB] bg-white"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/search.svg" alt="" className="h-6 w-6 opacity-70" />
        </Link>
        <HeaderAuthButton />
      </div>
    </header>
  );
}
